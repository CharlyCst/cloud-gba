from mgba import core, image
import asyncio
import websockets
import time
from io import BytesIO


print("Loading game")
c = core.load_path("spm.gba")

dims = c.desired_video_dimensions()
print("Desired dimensions : ", dims)
i = image.Image(*dims)

c.set_video_buffer(i)
c.reset()

screen_pool = set()

commands = [
    c.KEY_A,
    c.KEY_B,
    c.KEY_SELECT,
    c.KEY_START,
    c.KEY_RIGHT,
    c.KEY_LEFT,
    c.KEY_UP,
    c.KEY_DOWN,
    c.KEY_R,
    c.KEY_L,
]


async def say_after(delay, what):
    await asyncio.sleep(delay)
    print(what)


async def serve(websocket, path):
    co_type = await websocket.recv()
    print("Connection type is :", co_type)
    if co_type == "screen":
        screen_pool.add(websocket)
        try:
            await websocket.recv()
        except:
            pass
    if co_type == "input":
        while True:
            command = await websocket.recv()
            # print("Received command", command)
            up = True if command[0] == "1" else False
            button = commands[int(command[1])]
            if up:
                c.add_keys(button)
            else:
                c.clear_keys(button)


print("Starting websocket")


async def frame_loop():
    while True:
        compute_time = 0
        if len(screen_pool) > 0:
            t1 = time.clock_gettime_ns(time.CLOCK_REALTIME)

            # Get next frame and compress it
            buffer = BytesIO()
            c.run_frame()
            image = i.to_pil()
            image.save(buffer, format="JPEG")
            frame = buffer.getvalue()

            # Send frame to listeners
            dead_connections = []
            for screen in screen_pool:
                try:
                    await screen.send(frame)
                except:
                    dead_connections.append(screen)

            # Remove dead connections
            for conn in dead_connections:
                screen_pool.remove(conn)
                await conn.close()

            # Compute duration
            t2 = time.clock_gettime_ns(time.CLOCK_REALTIME)
            compute_time = t2 - t1
            # print(compute_time)
            if compute_time > 40000000:
                print("Warning, compute time is ", compute_time)
            # print("Time to get frame is ", t2 - t1)
        await asyncio.sleep(max(0, 0.03 - compute_time / 1000000000))


async def main():
    print(f"started at {time.strftime('%X')}")
    server = websockets.serve(serve, None, 8100)
    await asyncio.gather(frame_loop(), server)
    print(f"finished at {time.strftime('%X')}")


asyncio.run(main())

# for _ in range(300):
#     c.run_frame()
# c.add_keys(c.KEY_DOWN)

# for _ in range(300):
#     c.add_keys(c.KEY_DOWN)
#     c.run_frame()

# c.clear_keys(c.KEY_DOWN)
# f = open('out.png', 'wb')
# i.save_png(f)
# f.close()


# for x in range(800): c.run_frame()

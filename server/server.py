from mgba import core,image
import asyncio
import websockets
import time
from io import BytesIO


print("Loading game")
c = core.load_path('spm.gba')

dims = c.desired_video_dimensions()
print("Desired dimensions : ", dims)
i=image.Image(*dims)

c.set_video_buffer(i)
c.reset()

screen_pool = []


async def say_after(delay, what):
    await asyncio.sleep(delay)
    print(what)

async def serve(websocket, path):
    co_type = await websocket.recv()
    print("Connection type is :", co_type)
    if co_type == "screen":
        screen_pool.append(websocket)
    if co_type == "input":
        while True:
            command = await websocket.recv()
            print("Received command", command)

print("Starting websocket")

async def frame_loop():
    while True:
        print("Frame")
        if len(screen_pool) > 0:
            buffer = BytesIO()
            c.run_frame()
            t1 = time.clock_gettime_ns(time.CLOCK_REALTIME)
            image = i.to_pil()
            image.save(buffer, format="JPEG")
            tmp = buffer.getvalue()
            for screen in screen_pool:
                print("Sent here")
                await screen.send(tmp)
                #asyncio.create_task(screen.send(tmp))
            t2 = time.clock_gettime_ns(time.CLOCK_REALTIME)
            compute_time = t2 - t1
            print(compute_time)
            if compute_time > 40000000:
                print("Warning, compute time is ", compute_time)
            #print("Time to get frame is ", t2 - t1)
        await asyncio.sleep(0.1)

async def main():
    print(f"started at {time.strftime('%X')}")

    server = websockets.serve(serve, "localhost", 8100)

    await asyncio.gather(
        frame_loop(), 
        server
    )
    
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


#for x in range(800): c.run_frame()
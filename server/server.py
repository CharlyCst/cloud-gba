from mgba import core,image
import asyncio
import websockets
import time

print("Loading game")
c = core.load_path('spm.gba')

dims = c.desired_video_dimensions()
print("Desired dimensions : ", dims)
i=image.Image(*dims)

# c.set_video_buffer(i)
# c.reset()

screen_pool = []


async def say_after(delay, what):
    await asyncio.sleep(delay)
    print(what)

async def serve(websocket, path):
    co_type = await websocket.recv()
    print("Connection type is :", co_type)
    await websocket.send("Hello, world!")

print("Starting websocket")

async def frame_loop():
    while True:
        print("Frame")
        await asyncio.sleep(5)

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
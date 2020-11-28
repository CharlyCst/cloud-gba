from mgba import core,image
import asyncio
import websockets

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

server = websockets.serve(serve, "localhost", 8100)
asyncio.get_event_loop().run_until_complete(server)
asyncio.get_event_loop().run_forever()

# async def main():
#     print(f"started at {time.strftime('%X')}")

#     task1 = asyncio.create_task(
#         frame_loop())

#     task2 = asyncio.create_task(
#         say_after(2, 'world'))

#     print(f"finished at {time.strftime('%X')}")

# asyncio.run(main())

# async def serve(websocket, path):
#     for _ in range(nb_messages):
#         await websocket.send("Hello, world!")


# server = websockets.serve(serve, "localhost", 8100)



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
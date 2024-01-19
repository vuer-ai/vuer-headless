import cv2
from asyncio import sleep
from asyncio.exceptions import TimeoutError
from PIL import Image
from io import BytesIO
import numpy as np
import matplotlib.pyplot as plt

from vuer import Vuer, VuerSession
from vuer.schemas import DefaultScene, Box

app = Vuer()


@app.spawn(start=True)
async def main(sess: VuerSession):
    sess.set @ DefaultScene()
    sess.add @ Box(args=[1, 0.2, 0.5], materialType="standard", material=dict(color="#23aaff"))

    while True:
        await sleep(0.01)
        try:
            response = await sess.grab_render(key="DEFAULT", quality=0.95, downsample=2)
            print('rendered')
            # buff = response.value["frame"]
            #
            # pil_image = Image.open(BytesIO(buff))
            # img = np.array(pil_image)
            # img_bgr = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
            # cv2.imshow("frame", img_bgr)
            # print('rendered')
            # if cv2.waitKey(1) == ord("q"):
            #     exit()
        except TimeoutError:
            pass


    while True:
        await sleep(1.)

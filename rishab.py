from PIL import Image, ImageTk
import tkinter as tk
import requests
from io import BytesIO

# Function to download an image from a URL
def download_image(url):
    response = requests.get(url)
    response.raise_for_status()  # Will raise an HTTPError for bad responses
    return Image.open(BytesIO(response.content))

# URLs of images from the internet
template_url = 'https://example.com/path/to/template.jpg'  # Replace with actual template URL
image_url1 = 'https://www.w3schools.com/w3images/avatar2.png'
image_url2 = 'https://www.w3schools.com/w3images/avatar6.png'

try:
    # Download the template and the images
    template = download_image(template_url)
    image1 = download_image(image_url1)
    image2 = download_image(image_url2)

    # Define the coordinates and size of the frames in the template
    # Note: Replace with actual coordinates for your template
    frame_coords = [(100, 100, 200, 300), (400, 100, 200, 300)]  # Example coordinates

    # Function to resize and embed image
    def embed_image(template, images, coords):
        for i, (x, y, w, h) in enumerate(coords):
            # Resize image to fit the frame
            resized_image = images[i].resize((w, h), Image.ANTIALIAS)
            # Paste the image into the template
            template.paste(resized_image, (x, y))
        return template

    # Embed the images into the template
    final_image = embed_image(template, [image1, image2], frame_coords)

    # Save the final image
    final_image.save('final_image.jpg')

    # Display the final image using Tkinter
    root = tk.Tk()
    img = ImageTk.PhotoImage(final_image)
    panel = tk.Label(root, image=img)
    panel.pack(side="bottom", fill="both", expand="yes")
    root.mainloop()

except requests.exceptions.RequestException as e:
    print(f"Error downloading image: {e}")
except IOError as e:
    print(f"Error processing image: {e}")

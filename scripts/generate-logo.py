import os
import math
from PIL import Image, ImageDraw

def create_toolzy_icon(size=1024):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    pad = int(size * 0.04) # 4% padding
    box = [pad, pad, size - pad, size - pad]
    radius = int(size * 0.24) # Squircle corner radius

    # 1. Create 4-quadrant rounded tile
    # Create mask for rounded rect
    mask = Image.new("L", (size, size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle(box, radius=radius, fill=255)

    # Create 4 quadrants layer
    quad_layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    q_draw = ImageDraw.Draw(quad_layer)
    mid_x = size // 2
    mid_y = size // 2

    # Rich dark-mode quadrant colors matching the screenshot
    c_blue = (42, 60, 95, 255)      # Top-Left Blue
    c_red = (115, 45, 45, 255)      # Top-Right Red
    c_yellow = (120, 95, 30, 255)   # Bottom-Left Yellow/Gold
    c_green = (35, 85, 45, 255)     # Bottom-Right Forest Green

    # Draw quadrants
    q_draw.rectangle([0, 0, mid_x, mid_y], fill=c_blue)
    q_draw.rectangle([mid_x, 0, size, mid_y], fill=c_red)
    q_draw.rectangle([0, mid_y, mid_x, size], fill=c_yellow)
    q_draw.rectangle([mid_x, mid_y, size, size], fill=c_green)

    # Subtle quadrant divider lines
    div_color = (25, 25, 28, 120)
    q_draw.line([(mid_x, pad), (mid_x, size - pad)], fill=div_color, width=int(size * 0.01))
    q_draw.line([(pad, mid_y), (size - pad, mid_y)], fill=div_color, width=int(size * 0.01))

    # Apply rounded squircle mask
    tile = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    tile.paste(quad_layer, (0, 0), mask)

    # Tile border
    border_draw = ImageDraw.Draw(tile)
    border_draw.rounded_rectangle(box, radius=radius, outline=(255, 255, 255, 35), width=int(size * 0.02))

    # 2. Draw Center Wrench Icon
    # Center of wrench is at (mid_x, mid_y)
    # Wrench angle: roughly 45 degrees (from bottom-left to top-right)
    wrench_layer = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    w_draw = ImageDraw.Draw(wrench_layer)

    # Scale geometry
    line_w = int(size * 0.075)
    
    # Handle line from (320, 680) to (570, 430)
    p_handle_start = (int(size * 0.32), int(size * 0.68))
    p_handle_end = (int(size * 0.56), int(size * 0.44))
    
    # Wrench head center: around (640, 360)
    head_cx = int(size * 0.63)
    head_cy = int(size * 0.37)
    head_r = int(size * 0.16)

    # Draw wrench handle (thick glowing blue stroke)
    stroke_blue = (96, 165, 250, 255) # Bright light-blue / cyan (#60a5fa)
    
    # Handle body
    w_draw.line([p_handle_start, p_handle_end], fill=stroke_blue, width=line_w)
    
    # Handle end cap
    w_draw.ellipse([
        p_handle_start[0] - line_w // 2, p_handle_start[1] - line_w // 2,
        p_handle_start[0] + line_w // 2, p_handle_start[1] + line_w // 2
    ], fill=stroke_blue)

    # Draw wrench head arc (C-shape opening towards top-right)
    # Start angle ~ 110 deg to ~ 360+40 = 400 deg (leaving an opening at top-right ~ 10-90 deg)
    w_draw.arc([
        head_cx - head_r, head_cy - head_r,
        head_cx + head_r, head_cy + head_r
    ], start=65, end=380, fill=stroke_blue, width=line_w)

    # Prongs at the opening
    # Prong 1 (top)
    a1 = math.radians(65)
    p1 = (head_cx + int(head_r * math.cos(a1)), head_cy + int(head_r * math.sin(a1)))
    w_draw.ellipse([p1[0] - line_w//2, p1[1] - line_w//2, p1[0] + line_w//2, p1[1] + line_w//2], fill=stroke_blue)

    # Prong 2 (right)
    a2 = math.radians(380)
    p2 = (head_cx + int(head_r * math.cos(a2)), head_cy + int(head_r * math.sin(a2)))
    w_draw.ellipse([p2[0] - line_w//2, p2[1] - line_w//2, p2[0] + line_w//2, p2[1] + line_w//2], fill=stroke_blue)

    # 3. Accent Dots: Red inside jaw, Green on handle tip
    # Red dot inside upper jaw
    dot_red_c = (int(size * 0.63), int(size * 0.36))
    dot_r = int(size * 0.045)
    w_draw.ellipse([
        dot_red_c[0] - dot_r, dot_red_c[1] - dot_r,
        dot_red_c[0] + dot_r, dot_red_c[1] + dot_r
    ], fill=(239, 68, 68, 255)) # Vibrant Red

    # Green dot on bottom handle tip
    dot_green_c = (int(size * 0.32), int(size * 0.68))
    dot_gr_r = int(size * 0.038)
    w_draw.ellipse([
        dot_green_c[0] - dot_gr_r, dot_green_c[1] - dot_gr_r,
        dot_green_c[0] + dot_gr_r, dot_green_c[1] + dot_gr_r
    ], fill=(52, 211, 153, 255)) # Emerald Green

    # Composite tile and wrench
    final_img = Image.alpha_composite(tile, wrench_layer)
    return final_img

def main():
    icons_dir = "/home/sayandeep/workspace/sayandeepmajumdar.github.io/extension/icons"
    os.makedirs(icons_dir, exist_ok=True)

    base = create_toolzy_icon(size=1024)

    sizes = [16, 32, 48, 128]
    for s in sizes:
        resized = base.resize((s, s), Image.Resampling.LANCZOS)
        out_path = os.path.join(icons_dir, f"icon-{s}.png")
        resized.save(out_path, "PNG")
        print(f"Generated {out_path} ({s}x{s})")

if __name__ == "__main__":
    main()

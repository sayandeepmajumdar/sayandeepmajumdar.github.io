# 🧠 Interactive Neural Network Visualizer

A 100% client-side, interactive Machine Learning playground and real-time Neural Network Architecture visualizer built with Vanilla JavaScript, HTML5 Canvas, and modern CSS.

Hosted completely for free on **GitHub Pages** with zero backend, zero server calls, and zero external API dependencies.

---

## 🌟 Features

- ✏️ **Interactive Drawing Canvas (280×280)**: Smooth mouse & touch drawing with brush size controls, grid overlays, and instant clearing.
- 📐 **Automatic Feature Extraction Pipeline**:
  - Automatically isolates stroke bounding boxes.
  - Centers figures inside a square canvas with uniform margin to guarantee translational invariance.
  - Downsamples the drawing into a **10×10 sensory matrix (100 continuous normalized float inputs in $[0.0, 1.0]$)**.
  - Real-time 10×10 sensor preview display.
- ⚡ **Real-Time 60 FPS Synaptic Graph Visualizer**:
  - **Input Layer**: 100 spatial sensor nodes.
  - **Hidden Layer**: Configurable 8, 12, or 16 circular neurons with real-time activation ring gauges and inner glow.
  - **Output Layer**: 3 classification nodes (**⭕ Circle**, **⏹️ Square**, **🔺 Triangle**) with real-time probability meters and winning halo animations.
  - **Live Dynamic Synapses**: Smooth cubic Bezier curves dynamically colored by weight value:
    - **Cyan (`#00f2fe`)**: Positive (excitatory) weights ($W_{ij} > 0$).
    - **Neon Pink (`#f43f5e`)**: Negative (inhibitory) weights ($W_{ij} < 0$).
    - **Thickness & Opacity**: Proportional to weight magnitude $|W_{ij}|$.
  - **Particle Pulses**: Signal particle beads traveling along synapses during forward pass and backpropagation iterations.
  - **Interactive Hover Tooltip**: Hover any neuron or synapse to inspect its bias, activation value, and exact weight.
- ⚙️ **Training Control Panel & Live Metrics**:
  - Interactive **Epochs slider** (20 to 600) and **Learning Rate slider** (0.005 to 0.10).
  - **Start / Pause Training** toggle.
  - **Step 1 Epoch** button for educational inspection.
  - **Reset Model** button.
  - **Real-Time Loss Curve Canvas Chart**: Dynamically plots Cross-Entropy loss over epochs with neon pink gradient fills.
  - Live metric monitors for current Epoch, Loss, and Training Accuracy %.
  - **Asynchronous Micro-Batch Training Loop**: Runs via `requestAnimationFrame` so the UI stays buttery smooth at 60 FPS without freezing the browser.
- 🎯 **Inference & Live Testing**:
  - "Run Prediction" button.
  - "Live Predict" toggle that evaluates canvas drawings immediately on stroke completion.
  - Animated neon probability progress bars with winner badges.
- 📦 **Curated Pre-Loaded Dataset & Model Warmup**:
  - 45 synthetic shape samples (15 circles, 15 squares, 15 triangles of varying dimensions and line thicknesses) for instant 1-click training.
  - Pre-initialized weights so visitors can test predictions immediately upon landing on the page.
- 🎨 **Modern Cyber/Tech Aesthetics**: Dark mode background (`#070a13`), glassmorphic panels, neon glow accents, and responsive layout for desktop and mobile.

---

## 🔬 Mathematical & Architectural Formulation

### 1. Sensory Preprocessing
Given a 2D drawing of dimension $W \times H$:
1. Determine active bounding box: $[x_{min}, y_{min}, x_{max}, y_{max}]$ where pixel luminance $L(x, y) > 30$.
2. Pad by 18% and center inside a square bounding box of size $S = \max(x_{max} - x_{min}, y_{max} - y_{min}) + 2 \cdot \text{pad}$.
3. Downsample via area-averaging down to a $10 \times 10$ matrix:
   $$\vec{x} \in [0.0, 1.0]^{100}$$

### 2. Forward Propagation
1. **Input to Hidden Layer**:
   $$z_{1, j} = \sum_{i=1}^{100} x_i \cdot W_{1, ij} + b_{1, j}$$
   $$a_{1, j} = \sigma(z_{1, j}) = \frac{1}{1 + e^{-z_{1, j}}}$$

2. **Hidden to Output Layer**:
   $$z_{2, k} = \sum_{j=1}^{N_h} a_{1, j} \cdot W_{2, jk} + b_{2, k}$$

3. **Softmax Probabilities**:
   $$\hat{y}_k = \frac{e^{z_{2, k} - \max(\vec{z}_2)}}{\sum_{m=1}^{3} e^{z_{2, m} - \max(\vec{z}_2)}}$$

### 3. Loss & Backpropagation
- **Cross-Entropy Loss**:
  $$\mathcal{L} = -\sum_{k=1}^{3} y_k \ln(\hat{y}_k + \epsilon)$$

- **Output Error Gradient**:
  $$\delta_{2, k} = \hat{y}_k - y_k$$

- **Hidden Layer Error Gradient**:
  $$\delta_{1, j} = \left(\sum_{k=1}^{3} \delta_{2, k} \cdot W_{2, jk}\right) \cdot a_{1, j}(1 - a_{1, j})$$

- **Momentum Velocity & Weight Updates**:
  $$V_{W2} \leftarrow \beta \cdot V_{W2} + \eta \cdot (\delta_2 \otimes a_1^T)$$
  $$W_2 \leftarrow W_2 - V_{W2}$$
  $$V_{W1} \leftarrow \beta \cdot V_{W1} + \eta \cdot (\delta_1 \otimes \vec{x}^T)$$
  $$W_1 \leftarrow W_1 - V_{W1}$$
  where $\eta$ is the learning rate and $\beta = 0.85$ is the momentum coefficient.

---

## 📁 File Structure

```text
tools/neural-network-visualizer/
├── index.html     # Semantic HTML5 markup, CDN tags, and layout structure
├── style.css      # Cyber dark mode styling, glassmorphism, responsive grid, animations
├── app.js         # MLP engine, canvas drawing, synaptic graph visualizer, loss chart
└── README.md      # Comprehensive documentation and deployment instructions
```

---

## 🚀 GitHub Pages Deployment Steps

Because this application is 100% client-side with relative asset paths, it runs seamlessly on GitHub Pages:

### Option 1: Existing Repository Deployment (Automated)
1. Commit the new files to your repository:
   ```bash
   git add tools/neural-network-visualizer/ 404.html
   git commit -m "feat: add interactive neural network visualizer"
   git push origin main
   ```
2. Your tool will be immediately live at:
   - `https://<your-username>.github.io/tools/neural-network-visualizer/`
   - And via redirect alias at `https://<your-username>.github.io/neural-network-visualizer/`

### Option 2: Standalone Repository Deployment
If you wish to deploy this visualizer as an independent project:
1. Create a new GitHub repository (e.g., `neural-net-visualizer`).
2. Copy `index.html`, `style.css`, and `app.js` into the repository root:
   ```bash
   mkdir neural-net-visualizer
   cd neural-net-visualizer
   cp /path/to/tools/neural-network-visualizer/* .
   git init
   git add .
   git commit -m "Initial commit: Interactive Neural Network Visualizer"
   git branch -M main
   git remote add origin https://github.com/<your-username>/neural-net-visualizer.git
   git push -u origin main
   ```
3. In GitHub, go to **Settings** → **Pages** → **Source**, select `Deploy from a branch` (`main` / `/ (root)`), and click **Save**.
4. In under 60 seconds, your application is live at `https://<your-username>.github.io/neural-net-visualizer/`!

---

## 💡 Technologies Used

- **HTML5 Canvas API**: Dual hardware-accelerated canvases for drawing and 60 FPS synaptic animation with device-pixel-ratio scaling.
- **Vanilla JavaScript (ES6+)**: Custom vectorized Multi-Layer Perceptron engine with zero runtime dependencies.
- **Brain.js CDN**: Included in header for broader ecosystem and browser model compatibility.
- **Vanilla CSS3**: Cyberpunk dark mode, Glassmorphism (`backdrop-filter`), CSS Grid, and custom slider controls.

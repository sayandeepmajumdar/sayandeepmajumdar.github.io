/**
 * ==============================================================================
 * INTERACTIVE NEURAL NETWORK VISUALIZER - APP.JS
 * 100% Client-Side Machine Learning Playground & Live Architecture Visualizer
 *
 * Modules:
 * 1. CyberNeuralNet   - Custom MLP engine with transparent weights & backpropagation
 * 2. DrawingCanvas    - Touch/pointer canvas with downsampling & bounding-box normalization
 * 3. NetworkVisualizer- Canvas-based 60fps synaptic connection & node activation renderer
 * 4. LossChart        - High-performance real-time training loss curve renderer
 * 5. DatasetManager   - Sample collector, thumbnail generator & preset dataset loader
 * 6. AppController    - Event bindings, async training scheduler & inference pipeline
 * ==============================================================================
 */

(function () {
  'use strict';

  // ----------------------------------------------------------------------------
  // UTILITY HELPERS: Math, Color & Matrix operations
  // ----------------------------------------------------------------------------
  const Utils = {
    // Normal distribution random number generator (Box-Muller transform)
    randomGaussian(mean = 0, stdev = 1) {
      const u1 = 1 - Math.random();
      const u2 = 1 - Math.random();
      const randStdNormal = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
      return mean + stdev * randStdNormal;
    },

    // Xavier/Glorot weight initialization
    xavierInit(fanIn, fanOut) {
      const limit = Math.sqrt(6.0 / (fanIn + fanOut));
      return (Math.random() * 2 - 1) * limit;
    },

    // Standard Sigmoid activation function and its derivative
    sigmoid(x) {
      return 1 / (1 + Math.exp(-Math.max(-50, Math.min(50, x))));
    },

    sigmoidDerivative(sigVal) {
      return sigVal * (1 - sigVal);
    },

    // Numerically stable Softmax for probability distributions
    softmax(arr) {
      const maxVal = Math.max(...arr);
      const exps = arr.map(v => Math.exp(Math.max(-50, Math.min(50, v - maxVal))));
      const sum = exps.reduce((acc, v) => acc + v, 0) || 1e-9;
      return exps.map(v => v / sum);
    },

    // Linear interpolation
    lerp(a, b, t) {
      return a + (b - a) * t;
    },

    // Clamp helper
    clamp(val, min, max) {
      return Math.max(min, Math.min(max, val));
    }
  };

  // ----------------------------------------------------------------------------
  // MODULE 1: CyberNeuralNet (Client-Side Multi-Layer Perceptron)
  // ----------------------------------------------------------------------------
  /**
   * CyberNeuralNet is a purpose-built, pure-JS feedforward neural network designed
   * specifically for real-time visualization and inspection.
   *
   * Architecture:
   *   Input Layer (100 nodes: 10x10 grayscale pixel vector)
   *     -> Synapses (W1: 100 x Hidden) + Biases (B1: Hidden)
   *   Hidden Layer (8, 12, or 16 nodes with Sigmoid activation)
   *     -> Synapses (W2: Hidden x 3) + Biases (B2: 3)
   *   Output Layer (3 nodes: Softmax probabilities for Circle, Square, Triangle)
   *
   * Learning:
   *   Stochastic/Mini-batch Gradient Descent with Momentum and Cross-Entropy Loss.
   */
  class CyberNeuralNet {
    constructor(inputSize = 100, hiddenSize = 12, outputSize = 3) {
      this.inputSize = inputSize;
      this.hiddenSize = hiddenSize;
      this.outputSize = outputSize;

      this.labels = ['Circle', 'Square', 'Triangle'];
      this.initWeights();
    }

    // Initialize synaptic weight matrices and momentum velocity buffers
    initWeights() {
      // W1: inputSize x hiddenSize
      this.W1 = Array.from({ length: this.inputSize }, () =>
        Array.from({ length: this.hiddenSize }, () => Utils.xavierInit(this.inputSize, this.hiddenSize))
      );
      this.b1 = new Array(this.hiddenSize).fill(0.05);

      // W2: hiddenSize x outputSize
      this.W2 = Array.from({ length: this.hiddenSize }, () =>
        Array.from({ length: this.outputSize }, () => Utils.xavierInit(this.hiddenSize, this.outputSize))
      );
      this.b2 = new Array(this.outputSize).fill(0.0);

      // Momentum velocity matrices (for smooth gradient descent without oscillations)
      this.vW1 = Array.from({ length: this.inputSize }, () => new Array(this.hiddenSize).fill(0));
      this.vb1 = new Array(this.hiddenSize).fill(0);
      this.vW2 = Array.from({ length: this.hiddenSize }, () => new Array(this.outputSize).fill(0));
      this.vb2 = new Array(this.outputSize).fill(0);

      // Cached activations for visualization & inspection
      this.lastInput = new Array(this.inputSize).fill(0);
      this.lastHiddenZ = new Array(this.hiddenSize).fill(0);
      this.lastHiddenA = new Array(this.hiddenSize).fill(0);
      this.lastOutputZ = new Array(this.outputSize).fill(0);
      this.lastOutputA = new Array(this.outputSize).fill(0);
    }

    /**
     * Forward pass through network:
     * Calculates:
     *   z_hidden = W1^T * x + b1
     *   a_hidden = sigmoid(z_hidden)
     *   z_output = W2^T * a_hidden + b2
     *   a_output = softmax(z_output)
     */
    forward(inputVector) {
      this.lastInput = Array.from(inputVector);

      // 1. Input -> Hidden layer
      for (let j = 0; j < this.hiddenSize; j++) {
        let sum = this.b1[j];
        for (let i = 0; i < this.inputSize; i++) {
          sum += inputVector[i] * this.W1[i][j];
        }
        this.lastHiddenZ[j] = sum;
        this.lastHiddenA[j] = Utils.sigmoid(sum);
      }

      // 2. Hidden -> Output layer
      for (let k = 0; k < this.outputSize; k++) {
        let sum = this.b2[k];
        for (let j = 0; j < this.hiddenSize; j++) {
          sum += this.lastHiddenA[j] * this.W2[j][k];
        }
        this.lastOutputZ[k] = sum;
      }

      // 3. Softmax probability output
      this.lastOutputA = Utils.softmax(this.lastOutputZ);
      return this.lastOutputA;
    }

    /**
     * Backpropagation for a single training sample:
     * Computes loss gradients with respect to weights and biases,
     * then applies momentum updates.
     */
    trainSample(inputVector, targetOneHot, learningRate = 0.04, momentum = 0.85) {
      // 1. Forward pass
      const outputProbs = this.forward(inputVector);

      // 2. Compute Cross-Entropy loss: -sum(y_k * ln(p_k))
      let loss = 0;
      for (let k = 0; k < this.outputSize; k++) {
        loss -= targetOneHot[k] * Math.log(Math.max(1e-12, outputProbs[k]));
      }

      // 3. Output layer error delta (derivative of Softmax + Cross-Entropy is simply p_k - y_k)
      const deltaOutput = new Array(this.outputSize);
      for (let k = 0; k < this.outputSize; k++) {
        deltaOutput[k] = outputProbs[k] - targetOneHot[k];
      }

      // 4. Hidden layer error delta: delta_h = (W2 * deltaOutput) * sigmoid'(a_hidden)
      const deltaHidden = new Array(this.hiddenSize);
      for (let j = 0; j < this.hiddenSize; j++) {
        let errorSum = 0;
        for (let k = 0; k < this.outputSize; k++) {
          errorSum += deltaOutput[k] * this.W2[j][k];
        }
        deltaHidden[j] = errorSum * Utils.sigmoidDerivative(this.lastHiddenA[j]);
      }

      // 5. Update Hidden -> Output weights (W2) and biases (b2) with momentum
      for (let j = 0; j < this.hiddenSize; j++) {
        for (let k = 0; k < this.outputSize; k++) {
          const grad = deltaOutput[k] * this.lastHiddenA[j];
          this.vW2[j][k] = momentum * this.vW2[j][k] + learningRate * grad;
          this.W2[j][k] -= this.vW2[j][k];
        }
      }
      for (let k = 0; k < this.outputSize; k++) {
        const grad = deltaOutput[k];
        this.vb2[k] = momentum * this.vb2[k] + learningRate * grad;
        this.b2[k] -= this.vb2[k];
      }

      // 6. Update Input -> Hidden weights (W1) and biases (b1) with momentum
      for (let i = 0; i < this.inputSize; i++) {
        const xi = inputVector[i];
        if (xi === 0) continue; // Skip zero pixels for massive performance gain
        for (let j = 0; j < this.hiddenSize; j++) {
          const grad = deltaHidden[j] * xi;
          this.vW1[i][j] = momentum * this.vW1[i][j] + learningRate * grad;
          this.W1[i][j] -= this.vW1[i][j];
        }
      }
      for (let j = 0; j < this.hiddenSize; j++) {
        const grad = deltaHidden[j];
        this.vb1[j] = momentum * this.vb1[j] + learningRate * grad;
        this.b1[j] -= this.vb1[j];
      }

      return loss;
    }

    // Reconfigure hidden layer dimension dynamically
    setHiddenSize(newSize) {
      if (this.hiddenSize === newSize) return;
      this.hiddenSize = newSize;
      this.initWeights();
    }
  }

  // ----------------------------------------------------------------------------
  // MODULE 2: DrawingCanvas (Interactive Canvas & Image Downsampling Pipeline)
  // ----------------------------------------------------------------------------
  /**
   * Manages user drawing on the 280x280 HTML5 canvas with touch/mouse support.
   * Performs real-time feature transformation:
   *   Raw Drawing (280x280)
   *     -> Non-zero bounding box detection & aspect-ratio square centering
   *     -> Downsampling to 10x10 sensor grid (100 values)
   *     -> Grayscale normalization in [0.0, 1.0]
   */
  class DrawingCanvas {
    constructor(canvasEl, miniPreviewCanvasEl, onDrawChange) {
      this.canvas = canvasEl;
      this.ctx = canvasEl.getContext('2d', { willReadFrequently: true });
      this.miniCanvas = miniPreviewCanvasEl;
      this.miniCtx = miniPreviewCanvasEl.getContext('2d');
      this.onDrawChange = onDrawChange;

      this.isDrawing = false;
      this.brushSize = 22; // Default medium brush
      this.hasContent = false;

      // Downsampled 10x10 feature vector (100 numbers between 0.0 and 1.0)
      this.currentVector = new Float32Array(100);

      this.setupDPI();
      this.setupEvents();
      this.clear();
    }

    setupDPI() {
      const dpr = window.devicePixelRatio || 1;
      const rect = this.canvas.getBoundingClientRect();
      this.displayWidth = rect.width || 280;
      this.displayHeight = rect.height || 280;

      this.canvas.width = this.displayWidth * dpr;
      this.canvas.height = this.displayHeight * dpr;
      this.ctx.scale(dpr, dpr);

      // Mini preview 10x10 canvas setup
      this.miniCanvas.width = 10;
      this.miniCanvas.height = 10;
    }

    setupEvents() {
      const getPos = (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const clientX = e.clientX || (e.touches && e.touches[0].clientX);
        const clientY = e.clientY || (e.touches && e.touches[0].clientY);
        return {
          x: clientX - rect.left,
          y: clientY - rect.top
        };
      };

      const startDrawing = (e) => {
        e.preventDefault();
        this.isDrawing = true;
        this.canvas.parentElement.classList.add('drawing');
        const pos = getPos(e);
        this.ctx.beginPath();
        this.ctx.moveTo(pos.x, pos.y);
        this.drawPoint(pos.x, pos.y);
      };

      const drawMove = (e) => {
        if (!this.isDrawing) return;
        e.preventDefault();
        const pos = getPos(e);
        this.ctx.lineTo(pos.x, pos.y);
        this.ctx.strokeStyle = '#ffffff';
        this.ctx.lineWidth = this.brushSize;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.shadowColor = '#00f2fe';
        this.ctx.shadowBlur = 4;
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(pos.x, pos.y);
        this.hasContent = true;
        this.processDownsampling();
      };

      const stopDrawing = () => {
        if (!this.isDrawing) return;
        this.isDrawing = false;
        this.canvas.parentElement.classList.remove('drawing');
        this.ctx.beginPath();
        this.processDownsampling();
        if (this.onDrawChange) {
          this.onDrawChange(this.currentVector, this.hasContent);
        }
      };

      // Pointer events for desktop and mobile touch screens
      this.canvas.addEventListener('pointerdown', startDrawing);
      window.addEventListener('pointermove', drawMove);
      window.addEventListener('pointerup', stopDrawing);
      window.addEventListener('pointercancel', stopDrawing);

      window.addEventListener('resize', () => this.setupDPI());
    }

    drawPoint(x, y) {
      this.ctx.fillStyle = '#ffffff';
      this.ctx.shadowColor = '#00f2fe';
      this.ctx.shadowBlur = 4;
      this.ctx.beginPath();
      this.ctx.arc(x, y, this.brushSize / 2, 0, Math.PI * 2);
      this.ctx.fill();
      this.hasContent = true;
      this.processDownsampling();
    }

    clear() {
      this.ctx.save();
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.fillStyle = '#04060a';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.restore();

      this.hasContent = false;
      this.currentVector.fill(0);
      this.renderMiniPreview();

      if (this.onDrawChange) {
        this.onDrawChange(this.currentVector, false);
      }
    }

    setBrushSize(size) {
      this.brushSize = size;
    }

    /**
     * Downsample pipeline:
     * 1. Extract image pixel buffer.
     * 2. Compute bounding box to isolate stroke coordinates.
     * 3. Center shape with 15% margin and scale to 10x10 sensor array.
     */
    processDownsampling() {
      const dpr = window.devicePixelRatio || 1;
      const rawW = Math.floor(this.displayWidth * dpr);
      const rawH = Math.floor(this.displayHeight * dpr);

      const imgData = this.ctx.getImageData(0, 0, rawW, rawH);
      const data = imgData.data;

      // Find non-black bounding box
      let minX = rawW, maxX = -1, minY = rawH, maxY = -1;
      for (let y = 0; y < rawH; y += 2) {
        for (let x = 0; x < rawW; x += 2) {
          const idx = (y * rawW + x) * 4;
          // Check luminance (R + G + B) > threshold
          if (data[idx] > 30 || data[idx + 1] > 30 || data[idx + 2] > 30) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }

      // If canvas is blank
      if (maxX === -1) {
        this.currentVector.fill(0);
        this.hasContent = false;
        this.renderMiniPreview();
        return;
      }

      this.hasContent = true;

      // Center and normalize inside temporary offscreen 10x10 canvas
      const boxW = Math.max(1, maxX - minX);
      const boxH = Math.max(1, maxY - minY);
      const maxDim = Math.max(boxW, boxH);

      // Create an offscreen canvas for square centering
      const tempCanvas = document.createElement('canvas');
      const pad = Math.floor(maxDim * 0.18); // 18% padding
      const size = maxDim + pad * 2;
      tempCanvas.width = size;
      tempCanvas.height = size;
      const tempCtx = tempCanvas.getContext('2d');

      tempCtx.fillStyle = '#000000';
      tempCtx.fillRect(0, 0, size, size);

      const offsetX = pad + (maxDim - boxW) / 2;
      const offsetY = pad + (maxDim - boxH) / 2;

      tempCtx.drawImage(
        this.canvas,
        minX, minY, boxW, boxH,
        offsetX, offsetY, boxW, boxH
      );

      // Downsample to 10x10 on the miniCanvas
      this.miniCtx.drawImage(tempCanvas, 0, 0, 10, 10);
      const miniData = this.miniCtx.getImageData(0, 0, 10, 10).data;

      // Vector transformation: convert RGBA to single float [0.0, 1.0]
      for (let i = 0; i < 100; i++) {
        const idx = i * 4;
        const lum = (miniData[idx] * 0.299 + miniData[idx + 1] * 0.587 + miniData[idx + 2] * 0.114) / 255;
        this.currentVector[i] = Utils.clamp(lum, 0, 1);
      }

      this.renderMiniPreview();
    }

    renderMiniPreview() {
      // Draw grid lines and glowing pixels on mini preview canvas
      const w = this.miniCanvas.width;
      const h = this.miniCanvas.height;
      const imgData = this.miniCtx.createImageData(w, h);

      for (let i = 0; i < 100; i++) {
        const val = Math.floor(this.currentVector[i] * 255);
        const idx = i * 4;
        imgData.data[idx] = Math.floor(val * 0.1);     // R
        imgData.data[idx + 1] = Math.floor(val * 0.9); // G (Cyan-ish)
        imgData.data[idx + 2] = val;                   // B
        imgData.data[idx + 3] = val > 10 ? 255 : 20;   // Alpha
      }
      this.miniCtx.putImageData(imgData, 0, 0);
    }
  }

  // ----------------------------------------------------------------------------
  // MODULE 3: NetworkVisualizer (60 FPS Dynamic Synaptic Architecture Canvas)
  // ----------------------------------------------------------------------------
  /**
   * Renders the real-time neural network graph:
   * - Input Nodes: 10x10 spatial sensory grid on the left
   * - Hidden Nodes: Glowing circular neurons with activation dials
   * - Output Nodes: Labeled target nodes (⭕ Circle, ⏹️ Square, 🔺 Triangle)
   * - Synaptic Connections: Smooth Bezier curves dynamically colored and sized by weights:
   *     Positive weights: Electric Cyan (#00f2fe)
   *     Negative weights: Neon Pink (#f43f5e)
   *     Thickness: Proportional to |W|
   * - Signal Pulses: Animated particle beads traversing active paths
   */
  class NetworkVisualizer {
    constructor(canvasEl, model, tooltipEl) {
      this.canvas = canvasEl;
      this.ctx = canvasEl.getContext('2d');
      this.model = model;
      this.tooltip = tooltipEl;

      this.particles = [];
      this.hoveredItem = null;
      this.pulseIntensity = 0;
      this.animTime = 0;

      this.setupDPI();
      this.setupInteraction();
      this.startLoop();
    }

    setupDPI() {
      const dpr = window.devicePixelRatio || 1;
      const rect = this.canvas.getBoundingClientRect();
      this.width = rect.width || 600;
      this.height = rect.height || 500;

      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    setupInteraction() {
      window.addEventListener('resize', () => this.setupDPI());

      this.canvas.addEventListener('pointermove', (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        this.checkHover(mouseX, mouseY, e.clientX, e.clientY);
      });

      this.canvas.addEventListener('pointerleave', () => {
        this.hoveredItem = null;
        this.tooltip.classList.remove('show');
      });
    }

    checkHover(x, y, clientX, clientY) {
      if (!this.nodePositions) return;

      let found = null;

      // Check Output nodes
      this.nodePositions.output.forEach((node, k) => {
        const dist = Math.hypot(x - node.x, y - node.y);
        if (dist <= node.radius + 4) {
          found = {
            type: 'output',
            label: this.model.labels[k],
            index: k,
            activation: this.model.lastOutputA[k] || 0,
            bias: this.model.b2[k] || 0
          };
        }
      });

      // Check Hidden nodes
      if (!found) {
        this.nodePositions.hidden.forEach((node, j) => {
          const dist = Math.hypot(x - node.x, y - node.y);
          if (dist <= node.radius + 4) {
            found = {
              type: 'hidden',
              index: j,
              activation: this.model.lastHiddenA[j] || 0,
              bias: this.model.b1[j] || 0
            };
          }
        });
      }

      this.hoveredItem = found;

      if (found) {
        let text = '';
        if (found.type === 'output') {
          text = `<b>${found.label}</b> (Output ${found.index})<br>Probability: ${(found.activation * 100).toFixed(1)}%<br>Bias: ${found.bias.toFixed(3)}`;
        } else if (found.type === 'hidden') {
          text = `<b>Neuron H-${found.index + 1}</b><br>Activation: ${found.activation.toFixed(3)}<br>Bias: ${found.bias.toFixed(3)}`;
        }
        this.tooltip.innerHTML = text;
        this.tooltip.style.left = `${clientX}px`;
        this.tooltip.style.top = `${clientY - 12}px`;
        this.tooltip.classList.add('show');
      } else {
        this.tooltip.classList.remove('show');
      }
    }

    // Trigger forward pulse animation when a prediction or training sample runs
    triggerPulse(intensity = 1.0) {
      this.pulseIntensity = Math.min(2.0, this.pulseIntensity + intensity);

      // Spawn signal particles along strong synapses
      if (this.nodePositions && this.particles.length < 80) {
        const hiddenPos = this.nodePositions.hidden;
        const outputPos = this.nodePositions.output;

        for (let j = 0; j < hiddenPos.length; j++) {
          const act = this.model.lastHiddenA[j] || 0;
          if (act > 0.35) {
            for (let k = 0; k < outputPos.length; k++) {
              const weight = this.model.W2[j][k];
              if (Math.abs(weight) > 0.4 && Math.random() < 0.6) {
                this.particles.push({
                  from: hiddenPos[j],
                  to: outputPos[k],
                  progress: 0,
                  speed: 0.025 + Math.random() * 0.03,
                  color: weight > 0 ? '#00f2fe' : '#f43f5e',
                  size: 2.5 + Math.abs(weight) * 1.5
                });
              }
            }
          }
        }
      }
    }

    calculateLayout() {
      const w = this.width;
      const h = this.height;

      // 3 Columns: Input Sensory Area (Left), Hidden Layer (Center), Output Layer (Right)
      const inputX = w * 0.16;
      const hiddenX = w * 0.54;
      const outputX = w * 0.88;

      // Calculate 10x10 Input Grid positions
      const gridSize = Math.min(w * 0.18, h * 0.48, 160);
      const gridCell = gridSize / 10;
      const gridStartX = inputX - gridSize / 2;
      const gridStartY = (h - gridSize) / 2;

      const inputPositions = [];
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
          inputPositions.push({
            x: gridStartX + col * gridCell + gridCell / 2,
            y: gridStartY + row * gridCell + gridCell / 2,
            cellX: col,
            cellY: row,
            size: gridCell
          });
        }
      }

      // Hidden Nodes Positions (spaced vertically in center column)
      const numHidden = this.model.hiddenSize;
      const hiddenSpacing = Math.min(42, (h - 90) / (numHidden - 1 || 1));
      const hiddenStartY = (h - (numHidden - 1) * hiddenSpacing) / 2;

      const hiddenPositions = [];
      for (let j = 0; j < numHidden; j++) {
        hiddenPositions.push({
          x: hiddenX,
          y: hiddenStartY + j * hiddenSpacing,
          radius: 12
        });
      }

      // Output Nodes Positions (spaced vertically on right)
      const numOutput = this.model.outputSize;
      const outputSpacing = Math.min(90, (h - 120) / (numOutput - 1 || 1));
      const outputStartY = (h - (numOutput - 1) * outputSpacing) / 2;

      const outputPositions = [];
      for (let k = 0; k < numOutput; k++) {
        outputPositions.push({
          x: outputX,
          y: outputStartY + k * outputSpacing,
          radius: 18,
          label: this.model.labels[k]
        });
      }

      this.nodePositions = {
        inputGrid: inputPositions,
        gridBounds: { x: gridStartX, y: gridStartY, size: gridSize, cell: gridCell },
        hidden: hiddenPositions,
        output: outputPositions
      };
    }

    startLoop() {
      const render = () => {
        this.animTime += 0.02;
        this.draw();
        requestAnimationFrame(render);
      };
      requestAnimationFrame(render);
    }

    draw() {
      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;

      ctx.clearRect(0, 0, w, h);

      this.calculateLayout();
      const pos = this.nodePositions;

      // ---------------------------------------------------------
      // 1. DRAW SYNAPSES: Hidden Layer -> Output Layer
      // ---------------------------------------------------------
      for (let j = 0; j < this.model.hiddenSize; j++) {
        const hNode = pos.hidden[j];
        const hAct = this.model.lastHiddenA[j] || 0;

        for (let k = 0; k < this.model.outputSize; k++) {
          const oNode = pos.output[k];
          const weight = this.model.W2[j][k];
          const absWeight = Math.abs(weight);

          // Bezier control points for smooth curving fibers
          const cp1x = hNode.x + (oNode.x - hNode.x) * 0.5;
          const cp1y = hNode.y;
          const cp2x = hNode.x + (oNode.x - hNode.x) * 0.5;
          const cp2y = oNode.y;

          ctx.beginPath();
          ctx.moveTo(hNode.x, hNode.y);
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, oNode.x, oNode.y);

          // Weight coloring: Cyan for positive, Pink for negative
          const isPos = weight >= 0;
          const color = isPos ? '0, 242, 254' : '244, 63, 94';
          const alpha = Utils.clamp(0.08 + absWeight * 0.35 + hAct * 0.3, 0.06, 0.9);
          const strokeWidth = Utils.clamp(0.8 + absWeight * 2.2, 0.8, 5.0);

          ctx.strokeStyle = `rgba(${color}, ${alpha})`;
          ctx.lineWidth = strokeWidth;
          ctx.stroke();
        }
      }

      // ---------------------------------------------------------
      // 2. DRAW SYNAPSES: Input Sensory Grid -> Hidden Layer
      // (Rendered with bundled optic fibers from active inputs for max aesthetics & performance)
      // ---------------------------------------------------------
      const activeInputs = [];
      for (let i = 0; i < 100; i++) {
        const val = this.model.lastInput[i] || 0;
        if (val > 0.15) {
          activeInputs.push({ index: i, val });
        }
      }

      // If active inputs exist, draw connections from them; otherwise draw representative faint grid lines
      const inputIndices = activeInputs.length > 0
        ? activeInputs.slice(0, 30).map(a => a.index)
        : [12, 17, 24, 35, 42, 45, 54, 67, 73, 85]; // Ambient resting synapses

      inputIndices.forEach((i) => {
        const iNode = pos.inputGrid[i];
        const val = this.model.lastInput[i] || 0;

        for (let j = 0; j < this.model.hiddenSize; j++) {
          const hNode = pos.hidden[j];
          const weight = this.model.W1[i][j];
          const absWeight = Math.abs(weight);

          const cp1x = iNode.x + (hNode.x - iNode.x) * 0.45;
          const cp1y = iNode.y;
          const cp2x = iNode.x + (hNode.x - iNode.x) * 0.55;
          const cp2y = hNode.y;

          ctx.beginPath();
          ctx.moveTo(iNode.x, iNode.y);
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, hNode.x, hNode.y);

          const isPos = weight >= 0;
          const color = isPos ? '0, 242, 254' : '244, 63, 94';
          const alpha = Utils.clamp(0.04 + val * 0.5 + absWeight * 0.2, 0.03, 0.75);
          const strokeWidth = Utils.clamp(0.5 + absWeight * 1.5, 0.5, 3.5);

          ctx.strokeStyle = `rgba(${color}, ${alpha})`;
          ctx.lineWidth = strokeWidth;
          ctx.stroke();
        }
      });

      // ---------------------------------------------------------
      // 3. DRAW SIGNAL PARTICLES (Flowing through active paths)
      // ---------------------------------------------------------
      for (let p = this.particles.length - 1; p >= 0; p--) {
        const pt = this.particles[p];
        pt.progress += pt.speed;

        if (pt.progress >= 1.0) {
          this.particles.splice(p, 1);
          continue;
        }

        // Cubic bezier interpolation
        const t = pt.progress;
        const p0x = pt.from.x, p0y = pt.from.y;
        const p3x = pt.to.x, p3y = pt.to.y;
        const p1x = p0x + (p3x - p0x) * 0.5, p1y = p0y;
        const p2x = p0x + (p3x - p0x) * 0.5, p2y = p3y;

        const cx = 3 * (p1x - p0x), bx = 3 * (p2x - p1x) - cx, ax = p3x - p0x - cx - bx;
        const cy = 3 * (p1y - p0y), by = 3 * (p2y - p1y) - cy, ay = p3y - p0y - cy - by;

        const x = ax * t * t * t + bx * t * t + cx * t + p0x;
        const y = ay * t * t * t + by * t * t + cy * t + p0y;

        ctx.beginPath();
        ctx.arc(x, y, pt.size, 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.shadowColor = pt.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // ---------------------------------------------------------
      // 4. DRAW INPUT LAYER (10x10 Spatial Sensor Grid)
      // ---------------------------------------------------------
      const gb = pos.gridBounds;
      ctx.fillStyle = 'rgba(7, 10, 19, 0.85)';
      ctx.strokeStyle = 'rgba(0, 242, 254, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(gb.x - 2, gb.y - 2, gb.size + 4, gb.size + 4);
      ctx.fillRect(gb.x - 2, gb.y - 2, gb.size + 4, gb.size + 4);

      // Section label
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 11px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('INPUT LAYER (10×10 Grid)', gb.x + gb.size / 2, gb.y - 12);

      pos.inputGrid.forEach((cell, i) => {
        const val = this.model.lastInput[i] || 0;

        ctx.beginPath();
        ctx.rect(cell.x - cell.size / 2 + 0.5, cell.y - cell.size / 2 + 0.5, cell.size - 1, cell.size - 1);

        if (val > 0.05) {
          ctx.fillStyle = `rgba(0, 242, 254, ${Utils.clamp(0.2 + val * 0.8, 0.2, 1)})`;
          ctx.fill();
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
          ctx.fill();
        }

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // ---------------------------------------------------------
      // 5. DRAW HIDDEN LAYER NODES
      // ---------------------------------------------------------
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 11px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`HIDDEN LAYER (${this.model.hiddenSize} Neurons)`, pos.hidden[0].x, pos.hidden[0].y - 28);

      pos.hidden.forEach((node, j) => {
        const act = this.model.lastHiddenA[j] || 0;
        const isHovered = this.hoveredItem && this.hoveredItem.type === 'hidden' && this.hoveredItem.index === j;

        // Outer glow
        if (act > 0.3 || isHovered) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139, 92, 246, ${Utils.clamp(act * 0.45, 0.1, 0.6)})`;
          ctx.fill();
        }

        // Neuron Body
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? '#2e1065' : '#0d111d';
        ctx.fill();

        // Activation Fill / Gauge ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius - 2, -Math.PI / 2, -Math.PI / 2 + act * Math.PI * 2);
        ctx.strokeStyle = isHovered ? '#c4b5fd' : '#8b5cf6';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Neuron Border
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.strokeStyle = isHovered ? '#00f2fe' : 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = isHovered ? 2 : 1;
        ctx.stroke();

        // Label
        ctx.fillStyle = act > 0.5 ? '#ffffff' : '#94a3b8';
        ctx.font = '700 9px "JetBrains Mono", monospace';
        ctx.textBaseline = 'middle';
        ctx.fillText(`h${j + 1}`, node.x, node.y);
      });

      // ---------------------------------------------------------
      // 6. DRAW OUTPUT LAYER NODES
      // ---------------------------------------------------------
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 11px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('OUTPUT LAYER', pos.output[0].x, pos.output[0].y - 34);

      // Identify winner index
      let maxProb = -1, winnerIdx = -1;
      this.model.lastOutputA.forEach((prob, k) => {
        if (prob > maxProb) { maxProb = prob; winnerIdx = k; }
      });

      pos.output.forEach((node, k) => {
        const prob = this.model.lastOutputA[k] || 0;
        const isWinner = k === winnerIdx && prob > 0.35;
        const isHovered = this.hoveredItem && this.hoveredItem.type === 'output' && this.hoveredItem.index === k;

        // Winner pulsing ring
        if (isWinner) {
          const pulseR = node.radius + 6 + Math.sin(this.animTime * 6) * 3;
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulseR, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 242, 254, 0.22)';
          ctx.fill();
        }

        // Node Body
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = isWinner ? '#06202a' : '#0d111d';
        ctx.fill();

        // Probability Progress Arc
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius - 2, -Math.PI / 2, -Math.PI / 2 + prob * Math.PI * 2);
        ctx.strokeStyle = isWinner ? '#00f2fe' : (k === 1 ? '#8b5cf6' : '#10b981');
        ctx.lineWidth = 4;
        ctx.stroke();

        // Node Border
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.strokeStyle = isWinner ? '#00f2fe' : 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = isWinner ? 2 : 1;
        ctx.stroke();

        // Shape Icon Glyph inside node
        const glyphs = ['⭕', '⏹️', '🔺'];
        ctx.font = '14px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(glyphs[k], node.x, node.y);

        // Class Name & Percentage text to the right
        ctx.textAlign = 'left';
        ctx.font = isWinner ? '700 12px "Inter", sans-serif' : '500 11px "Inter", sans-serif';
        ctx.fillStyle = isWinner ? '#00f2fe' : '#e2e8f0';
        ctx.fillText(`${node.label}`, node.x + node.radius + 10, node.y - 6);

        ctx.font = '700 11px "JetBrains Mono", monospace';
        ctx.fillStyle = isWinner ? '#38bdf8' : '#64748b';
        ctx.fillText(`${(prob * 100).toFixed(1)}%`, node.x + node.radius + 10, node.y + 10);
      });
    }
  }

  // ----------------------------------------------------------------------------
  // MODULE 4: LossChart (High-Performance Real-Time Loss Curve Canvas)
  // ----------------------------------------------------------------------------
  /**
   * Renders the real-time Training Error / Loss Curve graph.
   * Auto-adjusts range, draws neon gradient fill under the curve,
   * and displays epoch milestones.
   */
  class LossChart {
    constructor(canvasEl) {
      this.canvas = canvasEl;
      this.ctx = canvasEl.getContext('2d');
      this.history = [];
      this.maxDataPoints = 120;

      this.setupDPI();
      window.addEventListener('resize', () => this.setupDPI());
      this.draw();
    }

    setupDPI() {
      const dpr = window.devicePixelRatio || 1;
      const rect = this.canvas.getBoundingClientRect();
      this.width = rect.width || 360;
      this.height = rect.height || 110;

      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.draw();
    }

    addPoint(loss) {
      this.history.push(loss);
      if (this.history.length > this.maxDataPoints) {
        this.history.shift();
      }
      this.draw();
    }

    reset() {
      this.history = [];
      this.draw();
    }

    draw() {
      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;

      ctx.clearRect(0, 0, w, h);

      // Background grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      for (let y = 20; y < h; y += 25) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      if (this.history.length < 2) {
        ctx.fillStyle = '#64748b';
        ctx.font = '500 11px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('Training Loss Curve will appear here...', w / 2, h / 2 + 4);
        return;
      }

      // Compute bounds
      const minLoss = 0;
      const maxLoss = Math.max(0.8, ...this.history) * 1.05;

      const padding = { top: 12, bottom: 16, left: 10, right: 10 };
      const plotW = w - padding.left - padding.right;
      const plotH = h - padding.top - padding.bottom;

      const getX = (idx) => padding.left + (idx / (this.history.length - 1)) * plotW;
      const getY = (val) => padding.top + plotH - ((val - minLoss) / (maxLoss - minLoss)) * plotH;

      // Draw Gradient fill below curve
      const gradient = ctx.createLinearGradient(0, padding.top, 0, h - padding.bottom);
      gradient.addColorStop(0, 'rgba(244, 63, 94, 0.35)');
      gradient.addColorStop(0.7, 'rgba(0, 242, 254, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 242, 254, 0.0)');

      ctx.beginPath();
      ctx.moveTo(getX(0), getY(this.history[0]));
      for (let i = 1; i < this.history.length; i++) {
        ctx.lineTo(getX(i), getY(this.history[i]));
      }
      ctx.lineTo(getX(this.history.length - 1), h - padding.bottom);
      ctx.lineTo(getX(0), h - padding.bottom);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw stroke curve
      ctx.beginPath();
      ctx.moveTo(getX(0), getY(this.history[0]));
      for (let i = 1; i < this.history.length; i++) {
        ctx.lineTo(getX(i), getY(this.history[i]));
      }
      ctx.strokeStyle = '#f43f5e';
      ctx.lineWidth = 2;
      ctx.shadowColor = 'rgba(244, 63, 94, 0.6)';
      ctx.shadowBlur = 6;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Current point dot
      const lastIdx = this.history.length - 1;
      const lastX = getX(lastIdx);
      const lastY = getY(this.history[lastIdx]);

      ctx.beginPath();
      ctx.arc(lastX, lastY, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#00f2fe';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  // ----------------------------------------------------------------------------
  // MODULE 5: DatasetManager (Custom Samples & Built-In Presets)
  // ----------------------------------------------------------------------------
  /**
   * Manages collected drawing samples, generates SVG/canvas thumbnails,
   * provides a pre-packaged curated dataset of Circles, Squares, and Triangles,
   * and loads pre-trained weights for instant exploration.
   */
  class DatasetManager {
    constructor(onDatasetChange) {
      this.samples = []; // Array of { id, label, target, input: Float32Array(100), thumbnail }
      this.onDatasetChange = onDatasetChange;
    }

    addSample(label, vector, skipNotify = false) {
      const targetMap = {
        'Circle': [1, 0, 0],
        'Square': [0, 1, 0],
        'Triangle': [0, 0, 1]
      };

      const target = targetMap[label] || [1, 0, 0];
      const thumbnail = this.generateThumbnail(vector);

      const sample = {
        id: 'sample_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        label,
        target,
        input: new Float32Array(vector),
        thumbnail
      };

      this.samples.push(sample);
      if (!skipNotify && this.onDatasetChange) {
        this.onDatasetChange(this.samples, this.getCounts());
      }
      return sample;
    }

    removeSample(id) {
      this.samples = this.samples.filter(s => s.id !== id);
      if (this.onDatasetChange) this.onDatasetChange(this.samples, this.getCounts());
    }

    clear() {
      this.samples = [];
      if (this.onDatasetChange) this.onDatasetChange(this.samples, this.getCounts());
    }

    getCounts() {
      return {
        Circle: this.samples.filter(s => s.label === 'Circle').length,
        Square: this.samples.filter(s => s.label === 'Square').length,
        Triangle: this.samples.filter(s => s.label === 'Triangle').length,
        total: this.samples.length
      };
    }

    generateThumbnail(vector) {
      const c = document.createElement('canvas');
      c.width = 10;
      c.height = 10;
      const ctx = c.getContext('2d');
      const imgData = ctx.createImageData(10, 10);

      for (let i = 0; i < 100; i++) {
        const val = Math.floor(vector[i] * 255);
        const idx = i * 4;
        imgData.data[idx] = Math.floor(val * 0.1);
        imgData.data[idx + 1] = Math.floor(val * 0.9);
        imgData.data[idx + 2] = val;
        imgData.data[idx + 3] = val > 15 ? 255 : 30;
      }
      ctx.putImageData(imgData, 0, 0);
      return c.toDataURL();
    }

    /**
     * Synthetically generates 45 varied, realistic samples (15 per shape)
     * with random offsets, scaling, and line jitter so the network
     * can be trained immediately out of the box!
     */
    loadPresets() {
      this.samples = [];

      const generatePresetCanvas = (drawFn) => {
        const c = document.createElement('canvas');
        c.width = 100;
        c.height = 100;
        const ctx = c.getContext('2d');
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, 100, 100);
        ctx.strokeStyle = '#ffffff';
        ctx.fillStyle = '#ffffff';
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        drawFn(ctx);

        // Downsample to 10x10
        const mini = document.createElement('canvas');
        mini.width = 10;
        mini.height = 10;
        const miniCtx = mini.getContext('2d');
        miniCtx.drawImage(c, 0, 0, 10, 10);
        const data = miniCtx.getImageData(0, 0, 10, 10).data;

        const vec = new Float32Array(100);
        for (let i = 0; i < 100; i++) {
          vec[i] = data[i * 4] / 255;
        }
        return vec;
      };

      // 1. Circles (varied radius & center)
      for (let i = 0; i < 15; i++) {
        const cx = 50 + (Math.random() - 0.5) * 8;
        const cy = 50 + (Math.random() - 0.5) * 8;
        const rx = 28 + Math.random() * 8;
        const ry = 28 + Math.random() * 8;
        const stroke = 7 + Math.random() * 4;

        const vec = generatePresetCanvas((ctx) => {
          ctx.lineWidth = stroke;
          ctx.beginPath();
          ctx.ellipse(cx, cy, rx, ry, (Math.random() - 0.5) * 0.4, 0, Math.PI * 2);
          ctx.stroke();
        });
        this.addSample('Circle', vec, true);
      }

      // 2. Squares / Rectangles
      for (let i = 0; i < 15; i++) {
        const size = 52 + Math.random() * 10;
        const x = 50 - size / 2 + (Math.random() - 0.5) * 6;
        const y = 50 - size / 2 + (Math.random() - 0.5) * 6;
        const stroke = 7 + Math.random() * 4;

        const vec = generatePresetCanvas((ctx) => {
          ctx.lineWidth = stroke;
          ctx.strokeRect(x, y, size, size);
        });
        this.addSample('Square', vec, true);
      }

      // 3. Triangles
      for (let i = 0; i < 15; i++) {
        const topY = 16 + Math.random() * 6;
        const bottomY = 82 + Math.random() * 6;
        const leftX = 18 + Math.random() * 6;
        const rightX = 82 + Math.random() * 6;
        const topX = 50 + (Math.random() - 0.5) * 8;
        const stroke = 7 + Math.random() * 4;

        const vec = generatePresetCanvas((ctx) => {
          ctx.lineWidth = stroke;
          ctx.beginPath();
          ctx.moveTo(topX, topY);
          ctx.lineTo(rightX, bottomY);
          ctx.lineTo(leftX, bottomY);
          ctx.closePath();
          ctx.stroke();
        });
        this.addSample('Triangle', vec, true);
      }

      if (this.onDatasetChange) this.onDatasetChange(this.samples, this.getCounts());
    }
  }

  // ----------------------------------------------------------------------------
  // MODULE 6: AppController (Integration, UI Wires & Async Training Engine)
  // ----------------------------------------------------------------------------
  class AppController {
    constructor() {
      // Model & Engine
      this.model = new CyberNeuralNet(100, 12, 3);

      // UI Element bindings
      this.dom = {
        drawingCanvas: document.getElementById('drawing-canvas'),
        miniCanvas: document.getElementById('mini-preview-canvas'),
        networkCanvas: document.getElementById('network-canvas'),
        lossChartCanvas: document.getElementById('loss-chart-canvas'),
        nodeTooltip: document.getElementById('node-tooltip'),

        // Controls
        btnClearCanvas: document.getElementById('btn-clear-canvas'),
        btnToggleGrid: document.getElementById('btn-toggle-grid'),
        gridOverlay: document.getElementById('grid-overlay'),
        brushBtns: document.querySelectorAll('.brush-btn'),

        // Labeling buttons
        labelCircleBtn: document.getElementById('btn-label-circle'),
        labelSquareBtn: document.getElementById('btn-label-square'),
        labelTriangleBtn: document.getElementById('btn-label-triangle'),

        // Sample counter tags
        countCircle: document.getElementById('count-circle'),
        countSquare: document.getElementById('count-square'),
        countTriangle: document.getElementById('count-triangle'),
        samplesStrip: document.getElementById('samples-strip'),
        btnLoadPresets: document.getElementById('btn-load-presets'),
        btnClearDataset: document.getElementById('btn-clear-dataset'),

        // Training Controls
        sliderEpochs: document.getElementById('slider-epochs'),
        valEpochs: document.getElementById('val-epochs'),
        sliderLr: document.getElementById('slider-lr'),
        valLr: document.getElementById('val-lr'),
        archPills: document.querySelectorAll('.arch-pill'),

        btnTrainToggle: document.getElementById('btn-train-toggle'),
        btnTrainStep: document.getElementById('btn-train-step'),
        btnResetWeights: document.getElementById('btn-reset-weights'),

        // Metrics
        metricEpoch: document.getElementById('metric-epoch'),
        metricLoss: document.getElementById('metric-loss'),
        metricAcc: document.getElementById('metric-acc'),
        statusPill: document.getElementById('training-status-pill'),
        statusDot: document.getElementById('training-status-dot'),
        statusText: document.getElementById('training-status-text'),

        // Inference
        btnPredict: document.getElementById('btn-predict'),
        toggleLivePredict: document.getElementById('toggle-live-predict'),
        probItems: document.querySelectorAll('.prob-bar-item'),

        // Modals & Navigation
        mobileTabBtns: document.querySelectorAll('.mobile-tab-btn'),
        columnLeft: document.getElementById('col-controls'),
        columnRight: document.getElementById('col-visualizer'),
        btnInfoModal: document.getElementById('btn-info-modal'),
        modalBackdrop: document.getElementById('info-modal'),
        btnCloseModal: document.getElementById('btn-close-modal'),
        toast: document.getElementById('cyber-toast')
      };

      // State
      this.isTraining = false;
      this.currentEpoch = 0;
      this.targetEpochs = 200;
      this.learningRate = 0.04;
      this.livePredict = true;
      this.trainingRafId = null;

      // Initialize components
      this.dataset = new DatasetManager((samples, counts) => this.onDatasetUpdated(samples, counts));

      this.drawer = new DrawingCanvas(
        this.dom.drawingCanvas,
        this.dom.miniCanvas,
        (vec, hasContent) => this.onDrawingChanged(vec, hasContent)
      );

      this.visualizer = new NetworkVisualizer(
        this.dom.networkCanvas,
        this.model,
        this.dom.nodeTooltip
      );

      this.lossChart = new LossChart(this.dom.lossChartCanvas);

      this.bindEvents();
      this.updateMetrics(0, 0.0, 0);

      // Populate presets after all components and DOM references are ready
      this.dataset.loadPresets();

      // Perform a quick warmup training on presets so the network has intelligent weights immediately
      this.quickWarmup();
    }

    quickWarmup() {
      // Train 15 silent epochs so the user can test predict immediately
      for (let ep = 0; ep < 25; ep++) {
        this.dataset.samples.forEach(sample => {
          this.model.trainSample(sample.input, sample.target, 0.05, 0.85);
        });
      }
      this.showToast('Ready! Model pre-initialized with sample weights.');
    }

    bindEvents() {
      // Canvas Toolbar
      this.dom.btnClearCanvas.addEventListener('click', () => {
        this.drawer.clear();
        this.resetProbBars();
      });

      this.dom.btnToggleGrid.addEventListener('click', () => {
        this.dom.gridOverlay.classList.toggle('visible');
        this.dom.btnToggleGrid.classList.toggle('btn-primary');
      });

      this.dom.brushBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.dom.brushBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const size = parseInt(btn.dataset.size, 10);
          this.drawer.setBrushSize(size);
        });
      });

      // Assign Drawing as Training Data
      const handleLabel = (label) => {
        if (!this.drawer.hasContent) {
          this.showToast('⚠️ Draw a shape on the canvas first!');
          return;
        }
        this.dataset.addSample(label, this.drawer.currentVector);
        this.drawer.clear();
        this.showToast(`Saved as "${label}" sample!`);
      };

      this.dom.labelCircleBtn.addEventListener('click', () => handleLabel('Circle'));
      this.dom.labelSquareBtn.addEventListener('click', () => handleLabel('Square'));
      this.dom.labelTriangleBtn.addEventListener('click', () => handleLabel('Triangle'));

      // Presets & Dataset Actions
      this.dom.btnLoadPresets.addEventListener('click', () => {
        this.dataset.loadPresets();
        this.showToast('Loaded 45 curated shape presets.');
      });

      this.dom.btnClearDataset.addEventListener('click', () => {
        if (confirm('Clear all collected training samples?')) {
          this.dataset.clear();
          this.showToast('Dataset cleared.');
        }
      });

      // Training Hyperparameters
      this.dom.sliderEpochs.addEventListener('input', (e) => {
        this.targetEpochs = parseInt(e.target.value, 10);
        this.dom.valEpochs.textContent = this.targetEpochs;
      });

      this.dom.sliderLr.addEventListener('input', (e) => {
        this.learningRate = parseFloat(e.target.value);
        this.dom.valLr.textContent = this.learningRate.toFixed(3);
      });

      // Hidden Architecture Selector
      this.dom.archPills.forEach(pill => {
        pill.addEventListener('click', () => {
          if (this.isTraining) return;
          this.dom.archPills.forEach(p => p.classList.remove('active'));
          pill.classList.add('active');
          const hiddenCount = parseInt(pill.dataset.hidden, 10);
          this.model.setHiddenSize(hiddenCount);
          this.currentEpoch = 0;
          this.lossChart.reset();
          this.updateMetrics(0, 0, 0);
          this.showToast(`Architecture updated: 100 → ${hiddenCount} → 3`);
        });
      });

      // Training Toggle (Start / Pause)
      this.dom.btnTrainToggle.addEventListener('click', () => {
        if (this.isTraining) {
          this.pauseTraining();
        } else {
          this.startTraining();
        }
      });

      // Step 1 Epoch
      this.dom.btnTrainStep.addEventListener('click', () => {
        if (this.isTraining) return;
        this.trainOneEpoch();
        this.visualizer.triggerPulse(0.5);
      });

      // Reset Weights
      this.dom.btnResetWeights.addEventListener('click', () => {
        this.pauseTraining();
        this.model.initWeights();
        this.currentEpoch = 0;
        this.lossChart.reset();
        this.updateMetrics(0, 0, 0);
        this.resetProbBars();
        this.showToast('Synaptic weights randomized.');
      });

      // Inference Button
      this.dom.btnPredict.addEventListener('click', () => {
        this.runInference();
      });

      this.dom.toggleLivePredict.addEventListener('change', (e) => {
        this.livePredict = e.target.checked;
      });

      // Mobile Tabs Toggle
      this.dom.mobileTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.dom.mobileTabBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const tab = btn.dataset.tab;
          if (tab === 'controls') {
            this.dom.columnLeft.classList.add('active-mobile');
            this.dom.columnRight.classList.remove('active-mobile');
          } else {
            this.dom.columnLeft.classList.remove('active-mobile');
            this.dom.columnRight.classList.add('active-mobile');
            this.visualizer.setupDPI();
          }
        });
      });

      // Info Modal
      this.dom.btnInfoModal.addEventListener('click', () => {
        this.dom.modalBackdrop.classList.add('active');
      });

      this.dom.btnCloseModal.addEventListener('click', () => {
        this.dom.modalBackdrop.classList.remove('active');
      });

      this.dom.modalBackdrop.addEventListener('click', (e) => {
        if (e.target === this.dom.modalBackdrop) {
          this.dom.modalBackdrop.classList.remove('active');
        }
      });
    }

    onDrawingChanged(vector, hasContent) {
      if (hasContent && this.livePredict) {
        this.runInference();
      }
    }

    onDatasetUpdated(samples, counts) {
      if (!counts && this.dataset) {
        counts = this.dataset.getCounts();
      }
      if (!counts) {
        counts = {
          Circle: samples.filter(s => s.label === 'Circle').length,
          Square: samples.filter(s => s.label === 'Square').length,
          Triangle: samples.filter(s => s.label === 'Triangle').length,
          total: samples.length
        };
      }
      this.dom.countCircle.textContent = counts.Circle;
      this.dom.countSquare.textContent = counts.Square;
      this.dom.countTriangle.textContent = counts.Triangle;

      // Render thumbnail strip (up to latest 14 samples)
      this.dom.samplesStrip.innerHTML = '';
      const recent = samples.slice(-14).reverse();

      recent.forEach(sample => {
        const item = document.createElement('div');
        item.className = 'sample-thumbnail';
        item.title = `${sample.label} (Click to delete)`;

        const img = document.createElement('img');
        img.src = sample.thumbnail;
        img.style.width = '100%';
        img.style.height = '100%';
        item.appendChild(img);

        const del = document.createElement('span');
        del.className = 'delete-tag';
        del.textContent = '×';
        item.appendChild(del);

        item.addEventListener('click', () => {
          this.dataset.removeSample(sample.id);
        });

        this.dom.samplesStrip.appendChild(item);
      });
    }

    // --------------------------------------------------------------------------
    // ASYNCHRONOUS TRAINING ENGINE (Non-Blocking 60 FPS Micro-Batch Loop)
    // --------------------------------------------------------------------------
    startTraining() {
      if (this.dataset.samples.length === 0) {
        this.showToast('⚠️ No training data! Draw or load presets.');
        return;
      }

      this.isTraining = true;
      this.dom.btnTrainToggle.textContent = '⏸ Pause Training';
      this.dom.btnTrainToggle.classList.replace('btn-primary', 'btn-danger');

      this.dom.statusDot.classList.add('training');
      this.dom.statusText.textContent = 'Training in Progress';

      const trainLoop = () => {
        if (!this.isTraining) return;

        // Process 4 epochs per animation frame for optimal speed without frame drops
        const batchSize = 4;
        let lastLoss = 0;

        for (let b = 0; b < batchSize; b++) {
          if (this.currentEpoch >= this.targetEpochs) {
            this.pauseTraining();
            this.showToast(`🎉 Training reached ${this.targetEpochs} epochs!`);
            return;
          }
          lastLoss = this.trainOneEpoch();
        }

        // Trigger visualizer particle spark
        this.visualizer.triggerPulse(0.4);

        this.trainingRafId = requestAnimationFrame(trainLoop);
      };

      this.trainingRafId = requestAnimationFrame(trainLoop);
    }

    pauseTraining() {
      this.isTraining = false;
      if (this.trainingRafId) {
        cancelAnimationFrame(this.trainingRafId);
        this.trainingRafId = null;
      }

      this.dom.btnTrainToggle.textContent = '▶ Start Training';
      this.dom.btnTrainToggle.classList.replace('btn-danger', 'btn-primary');

      this.dom.statusDot.classList.remove('training');
      this.dom.statusText.textContent = 'Idle / Ready';
    }

    trainOneEpoch() {
      const samples = this.dataset.samples;
      if (samples.length === 0) return 0;

      // Shuffle samples for stochastic SGD
      const shuffled = [...samples].sort(() => Math.random() - 0.5);

      let totalLoss = 0;
      let correctCount = 0;

      shuffled.forEach(sample => {
        const loss = this.model.trainSample(sample.input, sample.target, this.learningRate, 0.85);
        totalLoss += loss;

        // Check prediction accuracy
        const probs = this.model.lastOutputA;
        const predIdx = probs.indexOf(Math.max(...probs));
        const trueIdx = sample.target.indexOf(1);
        if (predIdx === trueIdx) correctCount++;
      });

      this.currentEpoch++;
      const avgLoss = totalLoss / samples.length;
      const acc = (correctCount / samples.length) * 100;

      this.lossChart.addPoint(avgLoss);
      this.updateMetrics(this.currentEpoch, avgLoss, acc);

      return avgLoss;
    }

    updateMetrics(epoch, loss, acc) {
      this.dom.metricEpoch.textContent = epoch;
      this.dom.metricLoss.textContent = loss.toFixed(4);
      this.dom.metricAcc.textContent = `${acc.toFixed(0)}%`;
    }

    // --------------------------------------------------------------------------
    // INFERENCE & PREDICTION DISPLAY
    // --------------------------------------------------------------------------
    runInference() {
      const vector = this.drawer.currentVector;
      const probs = this.model.forward(vector);

      // Identify winner
      let maxProb = -1, winnerIdx = -1;
      probs.forEach((p, idx) => {
        if (p > maxProb) {
          maxProb = p;
          winnerIdx = idx;
        }
      });

      // Update probability bars
      this.dom.probItems.forEach((item, idx) => {
        const fill = item.querySelector('.prob-fill');
        const num = item.querySelector('.prob-percentage');
        const percentage = (probs[idx] * 100).toFixed(1);

        fill.style.width = `${percentage}%`;
        num.textContent = `${percentage}%`;

        if (idx === winnerIdx && maxProb > 0.35) {
          item.classList.add('winner');
        } else {
          item.classList.remove('winner');
        }
      });

      // Animate visualizer pulse
      this.visualizer.triggerPulse(1.5);
    }

    resetProbBars() {
      this.dom.probItems.forEach((item) => {
        item.classList.remove('winner');
        item.querySelector('.prob-fill').style.width = '0%';
        item.querySelector('.prob-percentage').textContent = '0.0%';
      });
    }

    showToast(message) {
      this.dom.toast.textContent = message;
      this.dom.toast.classList.add('show');
      clearTimeout(this.toastTimer);
      this.toastTimer = setTimeout(() => {
        this.dom.toast.classList.remove('show');
      }, 2800);
    }
  }

  // ----------------------------------------------------------------------------
  // APPLICATION BOOTSTRAPPER
  // ----------------------------------------------------------------------------
  window.addEventListener('DOMContentLoaded', () => {
    window.CyberPlayground = new AppController();
  });

})();

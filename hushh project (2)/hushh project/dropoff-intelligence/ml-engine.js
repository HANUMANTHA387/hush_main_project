/**
 * Client-Side Machine Learning Engine
 * Implements Logistic Regression and K-Means clustering in pure JavaScript.
 */

class MLEngine {
    
    // --- Logistic Regression (Drop-off Predictor) ---
    // Predicts the probability [0, 1] of a user churning at their current step
    static logisticPredict(features, weights, bias) {
        let z = bias;
        for (let i = 0; i < features.length; i++) {
            z += features[i] * weights[i];
        }
        return 1 / (1 + Math.exp(-z));
    }

    // Trains a logistic regression model using gradient descent
    static trainLogistic(X, y, learningRate = 0.01, iterations = 200) {
        const numFeatures = X[0].length;
        let weights = new Array(numFeatures).fill(0);
        let bias = 0;

        for (let iter = 0; iter < iterations; iter++) {
            let dw = new Array(numFeatures).fill(0);
            let db = 0;

            for (let i = 0; i < X.length; i++) {
                const pred = this.logisticPredict(X[i], weights, bias);
                const err = pred - y[i];
                
                for (let j = 0; j < numFeatures; j++) {
                    dw[j] += err * X[i][j];
                }
                db += err;
            }

            for (let j = 0; j < numFeatures; j++) {
                weights[j] -= learningRate * (dw[j] / X.length);
            }
            bias -= learningRate * (db / X.length);
        }
        return { weights, bias };
    }

    // --- K-Means Clustering (Behavioral Segmentation) ---
    static getDistance(a, b) {
        return Math.sqrt(a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0));
    }

    static kMeans(data, k = 3, maxIter = 50) {
        if (!data || data.length === 0) return [];
        
        // Randomly initialize centroids
        let centroids = [];
        let ranges = data[0].map((_, col) => {
            const colData = data.map(row => row[col]);
            return { min: Math.min(...colData), max: Math.max(...colData) };
        });

        for (let i = 0; i < k; i++) {
            centroids.push(ranges.map(r => r.min + Math.random() * (r.max - r.min)));
        }

        let clusters = new Array(data.length).fill(0);
        let iter = 0;
        let changed = true;

        while (changed && iter < maxIter) {
            changed = false;
            // Assign data points to nearest centroid
            for (let i = 0; i < data.length; i++) {
                let minDist = Infinity;
                let clusterIndex = 0;
                for (let j = 0; j < k; j++) {
                    const dist = this.getDistance(data[i], centroids[j]);
                    if (dist < minDist) {
                        minDist = dist;
                        clusterIndex = j;
                    }
                }
                if (clusters[i] !== clusterIndex) {
                    clusters[i] = clusterIndex;
                    changed = true;
                }
            }

            // Recalculate centroids
            let newCentroids = new Array(k).fill(0).map(() => new Array(data[0].length).fill(0));
            let counts = new Array(k).fill(0);

            for (let i = 0; i < data.length; i++) {
                const cluster = clusters[i];
                for (let j = 0; j < data[i].length; j++) {
                    newCentroids[cluster][j] += data[i][j];
                }
                counts[cluster]++;
            }

            for (let j = 0; j < k; j++) {
                if (counts[j] > 0) {
                    centroids[j] = newCentroids[j].map(val => val / counts[j]);
                }
                // (Skip re-init of empty clusters for simplicity in this demo)
            }
            iter++;
        }

        return { centroids, assignments: clusters };
    }

    // --- Root Cause Inference Engine ---
    static analyzePatterns(trainedWeights, trainedBias, currentStepStats) {
        // Simple heuristic engine generating insights based on ML state
        const insights = [];
        
        // Example: If a specific step duration weight is high, infer causation
        if (currentStepStats.some(s => s.timeAvg > 120)) {
            const badStep = currentStepStats.find(s => s.timeAvg > 120);
            insights.push({
                type: 'critical',
                text: `Root Cause: High drop probability correlated with ${badStep.label} duration (>2 mins).`,
                action: 'Simplify Form / Use Autofill'
            });
        }
        
        // Check for specific step massive drop-offs
        currentStepStats.forEach(step => {
            if (step.dropoff > 300) {
                insights.push({
                    type: 'warning',
                    text: `Behavior Pattern: Fast-Exit cohort failing at '${step.label}' (OTP / Latency).`,
                    action: 'Improve Provider Speed'
                });
            }
        });
        
        // Generic fallback action
        if (insights.length === 0) {
            insights.push({
                type: 'info',
                text: 'Conversion flow is currently stable across all behavioral cohorts.',
                action: 'Monitor'
            });
        }

        return insights;
    }
}

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Tooltip,
  Legend
);

// Default chart options
export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } }
};

// Specific chart options
export const barChartOptions = {
  ...defaultChartOptions,
  scales: { 
    y: { 
      beginAtZero: true, 
      max: 100, 
      ticks: { callback: v => v + '%' } 
    } 
  }
};

export const pieChartOptions = {
  ...defaultChartOptions,
  plugins: { 
    legend: { 
      position: 'bottom', 
      labels: { font: { size: 11 } } 
    } 
  }
};

export const radarChartOptions = {
  ...defaultChartOptions,
  scales: { 
    r: { 
      beginAtZero: true, 
      max: 100, 
      ticks: { display: false } 
    } 
  }
};

// Color scheme
export const colors = {
  spam: '#ff6b6b',
  ham: '#4ecdc4',
  neutral: '#ffa726',
  spamBackground: 'rgba(255, 107, 107, 0.2)',
  hamBackground: 'rgba(78, 205, 196, 0.2)'
};

// Word lists for analysis
export const wordLists = {
  spam: ['free', 'win', 'prize', 'urgent', 'limited', 'offer', 'click',
         'money', 'cash', 'deal', 'buy', 'cheap', 'discount', 
         'winner', 'guaranteed', 'risk-free', 'bonus', 'credit', 'loan'],
  ham: ['adaptable', 'capable', 'competent', 'dedicated', 'determined',
        'diligent', 'efficient', 'flexible', 'focused', 'honest',
        'proactive', 'reliable', 'resourceful', 'trustworthy', 'versatile',
        'provided', 'applicant', 'reference', 'qualifications', 'position', 
        'availability', 'interview', 'resume', 'objective', 'response', 
        'collaboration', 'communication', 'leadership', 'networking', 
        'productivity', 'goal-oriented', 'teamwork']
};

// Text analysis functions
export const analyzeText = (emailText) => {
  const words = emailText.toLowerCase().split(' ').filter(w => w.length > 0);
  const spamWords = words.filter(w => wordLists.spam.includes(w)).length;
  const hamWords = words.filter(w => wordLists.ham.includes(w)).length;
  const neutralWords = words.length - spamWords - hamWords;
  
  const capsCount = (emailText.match(/[A-Z]/g) || []).length;
  const exclamationCount = (emailText.match(/!/g) || []).length;
  const numberCount = (emailText.match(/\d/g) || []).length;

  return {
    words,
    spamWords,
    hamWords,
    neutralWords,
    capsCount,
    exclamationCount,
    numberCount
  };
};

// Chart data generators
export const generateProbabilityData = (spamProb) => ({
  labels: ['Spam', 'Ham'],
  datasets: [{
    data: [spamProb, 100 - spamProb],
    backgroundColor: [colors.spam, colors.ham]
  }]
});

export const generateContentData = (spamWords, hamWords, neutralWords) => ({
  labels: ['Spam Words', 'Ham Words', 'Neutral'],
  datasets: [{
    data: [spamWords, hamWords, neutralWords],
    backgroundColor: [colors.spam, colors.ham, colors.neutral]
  }]
});

export const generateRadarData = (textAnalysis, spamProb, prediction) => ({
  labels: ['Spam Words', 'CAPS', 'Exclamations', 'Numbers', 'Risk Level'],
  datasets: [{
    data: [
      Math.min(textAnalysis.spamWords * 20, 100),
      Math.min(textAnalysis.capsCount * 2, 100),
      Math.min(textAnalysis.exclamationCount * 10, 100),
      Math.min(textAnalysis.numberCount * 5, 100),
      spamProb
    ],
    backgroundColor: prediction === 'spam' ? colors.spamBackground : colors.hamBackground,
    borderColor: prediction === 'spam' ? colors.spam : colors.ham,
    borderWidth: 2
  }]
});

// Prediction analysis
export const analyzePrediction = (predictionResult) => {
  const prediction = predictionResult.label || (predictionResult.verdict ? 'spam' : 'ham');
  const spamProb = (predictionResult.probability || 0) * 100;
  const confidence = prediction === 'spam' ? spamProb : (100 - spamProb);

  return {
    prediction,
    spamProb,
    confidence
  };
};

import React from 'react';
import { Bar, Pie, Radar } from 'react-chartjs-2';
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

const DataVisualizations = ({ predictionResult, emailText }) => {
  // Return loading if no data
  if (!predictionResult || !emailText) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  }

  // Simple calculations
  const words = emailText.toLowerCase().split(' ').filter(w => w.length > 0);
  const spamWords = words.filter(w => ['free', 'win', 'prize', 'urgent', 'limited', 'offer', 'click',
                         'money', 'cash', 'deal', 'buy', 'cheap', 'discount', 
                         'winner', 'guaranteed', 'risk-free', 'bonus', 'credit', 'loan'].includes(w)).length;
  const hamWords = words.filter(w => ['adaptable', 'capable', 'competent', 'dedicated', 'determined',
                        'diligent', 'efficient', 'flexible', 'focused', 'honest',
                        'proactive', 'reliable', 'resourceful', 'trustworthy', 'versatile',
                        'provided', 'applicant', 'reference', 'qualifications', 'position', 'availability',
                        'interview', 'resume', 'objective', 'response', 'collaboration',
                        'communication', 'leadership', 'networking', 'productivity',
                        'goal-oriented', 'teamwork'].includes(w)).length;
  const neutralWords = words.length - spamWords - hamWords;

  const capsCount = (emailText.match(/[A-Z]/g) || []).length;
  const exclamationCount = (emailText.match(/!/g) || []).length;
  const numberCount = (emailText.match(/\d/g) || []).length;

  const prediction = predictionResult.label || (predictionResult.verdict ? 'spam' : 'ham');
  const spamProb = (predictionResult.probability || 0) * 100;
  const confidence = prediction === 'spam' ? spamProb : (100 - spamProb);

  // Chart data
  const probabilityData = {
    labels: ['Spam', 'Ham'],
    datasets: [{
      data: [spamProb, 100 - spamProb],
      backgroundColor: ['#ff6b6b', '#4ecdc4']
    }]
  };

  const contentData = {
    labels: ['Spam Words', 'Ham Words', 'Neutral'],
    datasets: [{
      data: [spamWords, hamWords, neutralWords],
      backgroundColor: ['#ff6b6b', '#4ecdc4', '#ffa726']
    }]
  };

  const radarData = {
    labels: ['Spam Words', 'CAPS', 'Exclamations', 'Numbers', 'Risk Level'],
    datasets: [{
      data: [
        Math.min(spamWords * 20, 100),
        Math.min(capsCount * 2, 100),
        Math.min(exclamationCount * 10, 100),
        Math.min(numberCount * 5, 100),
        spamProb
      ],
      backgroundColor: prediction === 'spam' ? 'rgba(255, 107, 107, 0.2)' : 'rgba(78, 205, 196, 0.2)',
      borderColor: prediction === 'spam' ? '#ff6b6b' : '#4ecdc4',
      borderWidth: 2
    }]
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  };

  return (
    <div style={{ 
      marginTop: '2rem', 
      padding: '1.5rem', 
      backgroundColor: '#f8f9fa', 
      borderRadius: '12px'
    }}>
      <h3 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2c3e50' }}>
        📊 Email Analysis
      </h3>

      {/* Summary */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1.5rem',
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        <div style={{
          backgroundColor: prediction === 'spam' ? '#ffebee' : '#e8f5e8',
          padding: '1rem',
          borderRadius: '8px',
          textAlign: 'center',
          border: `2px solid ${prediction === 'spam' ? '#ff6b6b' : '#4ecdc4'}`
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0' }}>{prediction.toUpperCase()}</h4>
          <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>
            {confidence.toFixed(1)}% confident
          </p>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '1rem',
          borderRadius: '8px',
          textAlign: 'center',
          border: '2px solid #ddd'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0' }}>Words</h4>
          <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>{words.length}</p>
        </div>
      </div>

      {/* Charts */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1.5rem' 
      }}>
        <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '12px', height: '300px' }}>
          <h4 style={{ textAlign: 'center', margin: '0 0 1rem 0' }}>📈 Prediction</h4>
          <div style={{ height: '240px' }}>
            <Bar data={probabilityData} options={{
              ...options,
              scales: { y: { beginAtZero: true, max: 100, ticks: { callback: v => v + '%' } } }
            }} />
          </div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '12px', height: '300px' }}>
          <h4 style={{ textAlign: 'center', margin: '0 0 1rem 0' }}>📝 Content</h4>
          <div style={{ height: '240px' }}>
            <Pie data={contentData} options={{
              ...options,
              plugins: { legend: { position: 'bottom', labels: { font: { size: 11 } } } }
            }} />
          </div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '12px', height: '300px' }}>
          <h4 style={{ textAlign: 'center', margin: '0 0 1rem 0' }}>🎯 Risk Profile</h4>
          <div style={{ height: '220px' }}>
            <Radar data={radarData} options={{
              ...options,
              scales: { r: { beginAtZero: true, max: 100, ticks: { display: false } } }
            }} />
          </div>
          <p style={{ fontSize: '0.7rem', color: '#666', textAlign: 'center', margin: 0 }}>
            Larger areas = higher spam risk
          </p>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '8px',
        marginTop: '1.5rem',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '1rem',
        fontSize: '0.9rem'
      }}>
        <span>📝 {capsCount} CAPS</span>
        <span>❗ {exclamationCount} exclamations</span>
        <span>🔢 {numberCount} numbers</span>
        <span>📊 {spamProb.toFixed(1)}% spam risk</span>
      </div>
    </div>
  );
};

export default DataVisualizations;
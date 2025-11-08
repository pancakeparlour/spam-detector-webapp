import React from 'react';
import { Bar, Pie, Radar } from 'react-chartjs-2';
import {
  analyzeText,
  analyzePrediction,
  generateProbabilityData,
  generateContentData,
  generateRadarData,
  barChartOptions,
  pieChartOptions,
  radarChartOptions,
  colors
} from '../Chart';

const DataVisualizations = ({ predictionResult, emailText }) => {
  // Return loading if no data
  if (!predictionResult || !emailText) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;
  }

  // Analyze text and prediction using Chart.js utilities
  const textAnalysis = analyzeText(emailText);
  const { prediction, spamProb, confidence } = analyzePrediction(predictionResult);

  // Generate chart data using Chart.js utilities
  const probabilityData = generateProbabilityData(spamProb);
  const contentData = generateContentData(textAnalysis.spamWords, textAnalysis.hamWords, textAnalysis.neutralWords);
  const radarData = generateRadarData(textAnalysis, spamProb, prediction);

  return (
    <div style={{ 
      marginTop: '2rem', 
      padding: '1.5rem', 
      backgroundColor: '#f8f9fa', 
      borderRadius: '12px'
    }}>
      <h3 style={{ textAlign: 'center', marginBottom: '2rem', color: '#2c3e50' }}>
        Email Analysis - Logistic Regression model
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
          border: `2px solid ${prediction === 'spam' ? colors.spam : colors.ham}`
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
          <p style={{ margin: 0, fontSize: '1.1rem', fontWeight: 'bold' }}>{textAnalysis.words.length}</p>
        </div>
      </div>

      {/* Charts */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '1.5rem' 
      }}>
        <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '12px', height: '300px' }}>
          <h4 style={{ textAlign: 'center', margin: '0 0 1rem 0' }}>Email Prediction</h4>
          <div style={{ height: '240px' }}>
            <Bar data={probabilityData} options={barChartOptions} />
          </div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '12px', height: '300px' }}>
          <h4 style={{ textAlign: 'center', margin: '0 0 1rem 0' }}>Content</h4>
          <div style={{ height: '240px' }}>
            <Pie data={contentData} options={pieChartOptions} />
          </div>
        </div>

        <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '12px', height: '300px' }}>
          <h4 style={{ textAlign: 'center', margin: '0 0 1rem 0' }}>Risk Profile</h4>
          <div style={{ height: '220px' }}>
            <Radar data={radarData} options={radarChartOptions} />
          </div>
          <p style={{ fontSize: '0.7rem', color: '#666', textAlign: 'center', margin: 0 }}>
            Larger areas = higher spam risk (normalized to scale)
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
        <span>{textAnalysis.capsCount} CAPS</span>
        <span>{textAnalysis.exclamationCount} exclamations</span>
        <span>{textAnalysis.numberCount} numbers</span>
        <span>{spamProb.toFixed(1)}% spam risk</span>
      </div>
    </div>
  );
};

export default DataVisualizations;
import React, { Component } from 'react';
import TabBar from './components/tabbar';
import Footer from './components/footer';
import Search from './components/search';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <img
            src="img/total-discovery-logo.png"
            alt="logo"
            className="app-logo"
          />
        </div>

        <div className="app-search-container">
          <h1>Total Discovery</h1>
          <p className="app-search-subtitle">
            The most elegant solution to legal discovery.
          </p>

          <Search className="app-search" />

          {/* This tabbar is here just for looks. Didn't have time to hook it up to search */}
          <TabBar
            className="app-tabbar"
            items={[
              { title: 'All', key: 'all' },
              { title: 'Documents', key: 'Documents' },
              { title: 'Emails', key: 'Emails' },
              { title: 'Images', key: 'Images' },
              { title: 'More', key: 'More' }
            ]}
          />

          <div />
        </div>

        <MarketingSection />
        <Footer />
      </div>
    );
  }
}

const MarketingSection = () => (
  <div className="app-marketing-container">
    <h2>Search thousands of documents in seconds</h2>
    <h3>
      Technology and methods trusted by the Fortune® 500, AmLaw 200 and Forbes
      Global 2000.
    </h3>

    <div className="app-marketing-numbers-container">
      <div>
        <div className="app-marketing-number">40+</div>
        <div>COUNTRIES</div>
      </div>

      <div>
        <div className="app-marketing-number">10,000+</div>
        <div>CUSTODIANS UNDER MANAGEMENT</div>
      </div>

      <div>
        <div className="app-marketing-number">100+</div>
        <div>TERABYTES PRESERVED</div>
      </div>
    </div>

    <h2>Request a Live Demo of TotalDiscovery</h2>
    <h3>
      Give us 15 minutes of your time to learn about the key benefits of using
      TotalDiscovery.
    </h3>

    <div className="app-marketing-buttons-container">
      <button className="marketing-button primary-button">
        Request a Demo
      </button>
      <button className="marketing-button secondary-button">Learn More</button>
    </div>
  </div>
);

export default App;

import React, { Component } from 'react';
import TabBar from './components/tabbar';
import NavBar from './components/navbar';
import Footer from './components/footer';
import Search from './components/search';
import { search } from './api/search';
import debouncer from './util/debouncer';
import AsyncModel from './util/asyncModel';
import './App.css';

class App extends Component {
  state = {
    error: null,
    searchResults: null,
    loading: false
  };

  UNSAFE_componentWillMount() {
    // this is a bit of odd code. we need to debounce the user input so we dont hammer the server
    // but we have an async call to make. we need to ignore subsequent calls and only pay attention
    // to the latest query. There are more elegant approaches to dealing with this, but this is
    // what i was able to do in the alloted time.
    this.debounceSearch = debouncer(500, query => {
      if (!query) {
        return;
      }

      if (this.searchModel) {
        this.searchModel.destroy();
      }

      this.setState({
        loading: true,
        error: null,
        searchResults: null
      });

      this.searchModel = new AsyncModel(search(query), (error, data) => {
        this.searchModel = null;
        this.setState({
          loading: false,
          error,
          searchResults: data
        });
      });
    });
  }

  UNSAFE_componentWillUnMount() {
    if (this.searchModel) {
      this.searchModel.destroy();
    }
  }

  handleSearchEnterPressed = query => {
    this.debounceSearch(query);
  };

  render() {
    return (
      <div className="app">
        <NavBar />

        <div className="app-search-container">
          <h1>Total Discovery</h1>
          <p className="app-search-subtitle">
            The most elegant solution to legal discovery.
          </p>

          <Search
            className="app-search"
            onEnterPressed={this.handleSearchEnterPressed}
          />

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

        {this.renderContent()}
        <Footer />
      </div>
    );
  }

  renderContent() {
    const { error, searchResults, loading } = this.state;
    if (error) {
      return <h3>Oops! An error occured during the search</h3>;
    }

    if (loading) {
      return <div className="app-loading-spinner" />;
    }

    if (searchResults) {
      if (searchResults.length) {
        return (
          <div className="app-search-list">
            {searchResults.map((result, index) => (
              <div key={index} className="app-search-result-item">
                <h4>{result.title}</h4>
                <div>{result.filename}</div>
                <div>{result.computerName}</div>
              </div>
            ))}
          </div>
        );
      } else {
        return <h2 className="app-no-results">No Results.</h2>;
      }
    }

    return <MarketingSection />;
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
      <div className="app-marketing-number-container">
        <div className="app-marketing-number">40+</div>
        <div>COUNTRIES</div>
      </div>

      <div className="app-marketing-number-container">
        <div className="app-marketing-number">10,000+</div>
        <div>CUSTODIANS UNDER MANAGEMENT</div>
      </div>

      <div className="app-marketing-number-container">
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

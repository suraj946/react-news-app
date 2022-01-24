import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export class App extends Component {
  pgSize = 6;
  state = {progress : 0};
  setProgress = (progress)=>{
      this.setState({progress : progress});
  }
  apiKey = '3441e250247942c0baef86b8c3546801';
  render() {
    return (
      <div>
        <Router>
          <LoadingBar
            height={2.5}
            color='#f11946'
            progress={this.state.progress}
          />
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="general" pageSize={this.pgSize} country="in" category="general"/>} />
            <Route exact path="/business" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="business" pageSize={this.pgSize} country="in" category="business"/>} />
            <Route exact path="/entertainment" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey}  key="entertainment" pageSize={this.pgSize} country="in" category="entertainment"/>} />
            <Route exact path="/health" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="health" pageSize={this.pgSize} country="in" category="health"/>} />
            <Route exact path="/science" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="science" pageSize={this.pgSize} country="in" category="science"/>} />
            <Route exact path="/sports" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="sports" pageSize={this.pgSize} country="in" category="sports"/>} />
            <Route exact path="/technology" element={<News setProgress = {this.setProgress} apiKey = {this.apiKey} key="technology" pageSize={this.pgSize} country="in" category="technology"/>} />
          </Routes>
        </Router>
      </div>
    )
  }
}

export default App

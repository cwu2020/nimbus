import React, { Component } from 'react';
import './App.css';
import {fetch} from "whatwg-fetch";

class App extends Component {

   constructor(props) {
       super(props);
       this.state = {
           task: "",
           queue: [],
           time: "Short",
       }
       this.onClickSubmit.bind(this);
   }

   renderButton(type) {
       if (type === 'Available') {
           return <button type="button" className="btn btn-success" style={{marginLeft: "60px", marginTop: "20px"}}>Available</button>;
       } else if (type === 'Idle') {
           return <button type="button" className="btn btn-secondary btn-lg" style={{marginLeft: "60px", marginTop: "20px"}}>Idle</button>;
       } else {
           return <button type="button" className="btn btn-primary" style={{marginLeft: "60px", marginTop: "20px"}}>In Use</button>
       }
   }

  renderDevice(data) {
      return (
          <div className="display-flex" style={{marginTop: "3%"}}>
              <div className="card flex-value" style={{width: "50%"}}>
                  <div className="card-body no-padding">
                      <div className="display-flex">
                          <div className="flex-value">
                              <img src="https://media.wired.com/photos/5b22c5c4b878a15e9ce80d92/master/pass/iphonex-TA.jpg" width="90" height="80"/>
                          </div>
                          <div className="flex-value device-specification">
                              Device: {data.name}
                              <br/>
                              Software: {data.software}
                          </div>
                      </div>
                  </div>
              </div>
              <div className="flex-value">
                  {this.renderButton(data.type)}
              </div>
          </div>
      );
  }

  onChangeTextarea(event) {
       this.setState({task: event.target.value});
  }

  onChangeTime(event) {
        this.setState({time: event.target.value});
  }

  onClickSubmit() {
      const task = this.state.task;
      const newQueue = this.state.queue.concat([task]);
      console.log(newQueue);
      this.setState({queue: newQueue, task: ""});
      var data = {algo: task, time: this.state.time};

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
              console.log(this.responseText);
          }
      });

      xhr.open("POST", "https://1142a365.ngrok.io/compute/add/task");
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      xhr.setRequestHeader("accept", "application/json");
      xhr.setRequestHeader("cache-control", "no-cache");
      xhr.send(JSON.stringify(data));
   }

  render() {
      return (
          <div className="App">
            <header className="App-header">
                <h1 className="App-title">Nimbus</h1>
            </header>
            <section className="container">
                <div className="left-half">
                    <div className="card-height tasks-card-height">
                        <div className="form-group">
                            <label className="upload-task-title">Upload Task</label>
                            <textarea className="form-control code-height" value={this.state.task} onChange={this.onChangeTextarea.bind(this)}></textarea>

                            <div className="time-title" style={{marginTop: "5px"}}>Time Estimate</div>
                            <div style={{height: "fit-content", marginTop: "15px"}} />
                            <select name="time" onChange={this.onChangeTime.bind(this)}>
                                <option>Short</option>
                                <option>Medium</option>
                                <option>Long</option>
                            </select>
                            <div style={{height: "fit-content", marginTop: "15px"}} />
                            <button type="button" className="btn btn-primary" onClick={this.onClickSubmit.bind(this)}>Submit task</button>
                        </div>
                    </div>
                </div>
                <div className="right-half">
                    <div className="devices-card-height">
                        <label className="upload-task-title">Devices Registered</label>
                        {this.renderDevice({type: 'In Use', name: "iPhone X", software: "iOS 11"})}
                    </div>
                </div>
            </section>
        </div>
    );
  }
}

export default App;

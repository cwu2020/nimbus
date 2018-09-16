import React, { Component } from 'react';
import './App.css';
import {fetch} from "whatwg-fetch";
import request from "superagent";
let response = "";

class App extends Component {

   constructor(props) {
       super(props);
       this.state = {
           task: "",
           queue: [],
           time: "Short",
           inUseDevices: [],
           availableIndex: 0,
           iphone1: false,
           iphone2: false,
           iphone3: false,
           iphone4: false,
           iphone5: false,
           iphone6: false,
           d: [],
           t: [],
           de: null

       }

       setInterval(() => {
           request
               .post('https://85bc5698.ngrok.io/compute/stats')
               .send({}) // sends a JSON post body
               .set("content-type", "application/x-www-form-urlencoded")
               .set("accept", "application/json")
               .end((err, res) => {
                   const response = JSON.parse(res.text);
                   this.setState({d: response.d, t: response.t})
                   // Calling the end function will send the request
               });
       }, 5000);

       this.onClickSubmit = this.onClickSubmit.bind(this);
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

   // componentDidMount() {
   //     setInterval(() => {
   //         var data = null;
   //
   //         var xhr = new XMLHttpRequest();
   //         xhr.withCredentials = true;
   //
   //         xhr.onreadystatechange = () => {
   //             this.setState({de: this.responseText})
   //         };
   //
   //         xhr.open("POST", "https://b78a31e4.ngrok.io/compute/stats");
   //         xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
   //         xhr.setRequestHeader("accept", "application/json");
   //         xhr.setRequestHeader("cache-control", "no-cache");
   //         xhr.send(JSON.stringify(data));
   //     }, 1000)
   // }

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

  onClickSubmit = () => {
      const task = this.state.task;
      const newQueue = this.state.queue.concat([task]);
      console.log(newQueue);
      this.setState({queue: newQueue, task: ""});

      var data = {algo: task, time: this.state.time};

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
          if (this.readyState === 4) {
             response = JSON.parse(this.responseText)["index"];
          }
      });

      xhr.open("POST", "https://85bc5698.ngrok.io/compute/add/task");
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      xhr.setRequestHeader("accept", "application/json");
      xhr.setRequestHeader("cache-control", "no-cache");
      xhr.send(JSON.stringify(data));

  }

  render() {
      console.log(this.state.d);
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
                        {this.state.d.map((item, i) => {
                            let type = 'Available';
                            if(this.state.d[i].task !== -1) {
                                type = 'In Use'
                            }
                            return this.renderDevice({type: type, name: (this.state.d[i]).model, software: (this.state.d[i]).OS})
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
  }
}

export default App;

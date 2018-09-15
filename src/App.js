import React, { Component } from 'react';
import './App.css';

class App extends Component {

   constructor(props) {
       super(props);
       this.state = {
           task: ""
       }
   }

   renderButton(type) {
       if (type === 'Available') {
           return <button type="button" class="btn btn-success" style={{marginLeft: "60px", marginTop: "20px"}}>Available</button>;
       } else if (type === 'Idle') {
           return <button type="button" class="btn btn-secondary btn-lg" style={{marginLeft: "60px", marginTop: "20px"}}>Idle</button>;
       } else {
           return <button type="button" class="btn btn-primary" style={{marginLeft: "60px", marginTop: "20px"}}>In Use</button>
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

  onClickSubmit() {
       console.log(this.state.task);
  }

  render() {
      return (
          <div className="App">
            <header className="App-header">
                <h1 className="App-title">Nimbus</h1>
            </header>
            <section class="container">
                <div class="left-half">
                    <div className="card-height tasks-card-height">
                        <div class="form-group">
                            <label className="upload-task-title">Upload Task</label>
                            <textarea className="form-control code-height" value={this.state.task} onChange={this.onChangeTextarea.bind(this)}></textarea>
                            <br />
                            <button type="button" class="btn btn-primary" onClick={this.onClickSubmit.bind(this)}>Submit task</button>
                        </div>
                    </div>
                </div>
                <div class="right-half">
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

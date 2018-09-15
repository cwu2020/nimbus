import React, { Component } from 'react';
import './App.css';

class App extends Component {

  renderDevice(data) {
      return (
          <div className="display-flex" style={{marginTop: "3%"}}>
              <div className="card flex-value" style={{width: "50%"}}>
                  <div className="card-body no-padding">
                      <div className="display-flex">
                          <div className="flex-value">
                              <img src="https://media.wired.com/photos/5b22c5c4b878a15e9ce80d92/master/pass/iphonex-TA.jpg" width="80" height="80"/>
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
                  {data.isAvailable ? <button type="button" class="btn btn-lg btn-primary" style={{marginLeft: "60px", marginTop: "20px"}}>Available</button> :
                      <button type="button" class="btn btn-secondary btn-lg">Idle</button>}
              </div>
          </div>
      );
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
                            <textarea className="form-control code-height"></textarea>
                            <br />
                            <button type="button" class="btn btn-primary">Submit task</button>
                        </div>
                    </div>
                </div>
                <div class="right-half">
                    <div className="devices-card-height">
                        <label className="upload-task-title">Devices Registered</label>
                        {this.renderDevice({isAvailable: true, name: "iPhone X", software: "iOS 11"})}
                    </div>
                </div>
            </section>
        </div>
    );
  }
}

export default App;

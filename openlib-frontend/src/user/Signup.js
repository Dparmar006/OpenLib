import React from "react";

function Signup() {
  return (
    <div className="row">
      <div className="col-lg-8 col-md-8">
        <h3 className="mb-30">Form Element</h3>
        <form action="#">
          <div className="mt-10">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'First Name'"
              required
              className="single-input"
            />
          </div>
          <div className="mt-10">
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'Last Name'"
              required
              className="single-input"
            />
          </div>
          <div className="mt-10">
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'Last Name'"
              required
              className="single-input"
            />
          </div>
          <div className="mt-10">
            <input
              type="email"
              name="EMAIL"
              placeholder="Email address"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'Email address'"
              required
              className="single-input"
            />
          </div>
          <div className="input-group-icon mt-10">
            <div className="icon">
              <i className="fa fa-thumb-tack" aria-hidden="true"></i>
            </div>
            <input
              type="text"
              name="address"
              placeholder="Address"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'Address'"
              required
              className="single-input"
            />
          </div>
          <div className="input-group-icon mt-10">
            <div className="icon">
              <i className="fa fa-plane" aria-hidden="true"></i>
            </div>
            <div className="form-select" id="default-select">
              <select>
                <option value=" 1">City</option>
                <option value="1">Dhaka</option>
                <option value="1">Dilli</option>
                <option value="1">Newyork</option>
                <option value="1">Islamabad</option>
              </select>
            </div>
          </div>
          <div className="input-group-icon mt-10">
            <div className="icon">
              <i className="fa fa-globe" aria-hidden="true"></i>
            </div>
            <div className="form-select" id="default-select">
              <select>
                <option value=" 1">Country</option>
                <option value="1">Bangladesh</option>
                <option value="1">India</option>
                <option value="1">England</option>
                <option value="1">Srilanka</option>
              </select>
            </div>
          </div>

          <div className="mt-10">
            <textarea
              className="single-textarea"
              placeholder="Message"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'Message'"
              required
            ></textarea>
          </div>
          <div className="mt-10">
            <input
              type="text"
              name="first_name"
              placeholder="Primary color"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'Primary color'"
              required
              className="single-input-primary"
            />
          </div>
          <div className="mt-10">
            <input
              type="text"
              name="first_name"
              placeholder="Accent color"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'Accent color'"
              required
              className="single-input-accent"
            />
          </div>
          <div className="mt-10">
            <input
              type="text"
              name="first_name"
              placeholder="Secondary color"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'Secondary color'"
              required
              className="single-input-secondary"
            />
          </div>
        </form>
      </div>
      <div className="col-lg-3 col-md-4 mt-sm-30">
        <div className="single-element-widget">
          <h3 className="mb-30">Switches</h3>
          <div className="switch-wrap d-flex justify-content-between">
            <p>01. Sample Switch</p>
            <div className="primary-switch">
              <input type="checkbox" id="default-switch" />
              <label for="default-switch"></label>
            </div>
          </div>
          <div className="switch-wrap d-flex justify-content-between">
            <p>02. Primary Color Switch</p>
            <div className="primary-switch">
              <input type="checkbox" id="primary-switch" checked />
              <label for="primary-switch"></label>
            </div>
          </div>
          <div className="switch-wrap d-flex justify-content-between">
            <p>03. Confirm Color Switch</p>
            <div className="confirm-switch">
              <input type="checkbox" id="confirm-switch" checked />
              <label for="confirm-switch"></label>
            </div>
          </div>
        </div>
        <div className="single-element-widget mt-30">
          <h3 className="mb-30">Selectboxes</h3>
          <div className="default-select" id="default-select">
            <select>
              <option value=" 1">English</option>
              <option value="1">Spanish</option>
              <option value="1">Arabic</option>
              <option value="1">Portuguise</option>
              <option value="1">Bengali</option>
            </select>
          </div>
        </div>
        <div className="single-element-widget mt-30">
          <h3 className="mb-30">Checkboxes</h3>
          <div className="switch-wrap d-flex justify-content-between">
            <p>01. Sample Checkbox</p>
            <div className="primary-checkbox">
              <input type="checkbox" id="default-checkbox" />
              <label for="default-checkbox"></label>
            </div>
          </div>
          <div className="switch-wrap d-flex justify-content-between">
            <p>02. Primary Color Checkbox</p>
            <div className="primary-checkbox">
              <input type="checkbox" id="primary-checkbox" checked />
              <label for="primary-checkbox"></label>
            </div>
          </div>
          <div className="switch-wrap d-flex justify-content-between">
            <p>03. Confirm Color Checkbox</p>
            <div className="confirm-checkbox">
              <input type="checkbox" id="confirm-checkbox" />
              <label for="confirm-checkbox"></label>
            </div>
          </div>
          <div className="switch-wrap d-flex justify-content-between">
            <p>04. Disabled Checkbox</p>
            <div className="disabled-checkbox">
              <input type="checkbox" id="disabled-checkbox" disabled />
              <label for="disabled-checkbox"></label>
            </div>
          </div>
          <div className="switch-wrap d-flex justify-content-between">
            <p>05. Disabled Checkbox active</p>
            <div className="disabled-checkbox">
              <input
                type="checkbox"
                id="disabled-checkbox-active"
                checked
                disabled
              />
              <label for="disabled-checkbox-active"></label>
            </div>
          </div>
        </div>
        <div className="single-element-widget mt-30">
          <h3 className="mb-30">Radios</h3>
          <div className="switch-wrap d-flex justify-content-between">
            <p>01. Sample radio</p>
            <div className="primary-radio">
              <input type="checkbox" id="default-radio" />
              <label for="default-radio"></label>
            </div>
          </div>
          <div className="switch-wrap d-flex justify-content-between">
            <p>02. Primary Color radio</p>
            <div className="primary-radio">
              <input type="checkbox" id="primary-radio" checked />
              <label for="primary-radio"></label>
            </div>
          </div>
          <div className="switch-wrap d-flex justify-content-between">
            <p>03. Confirm Color radio</p>
            <div className="confirm-radio">
              <input type="checkbox" id="confirm-radio" checked />
              <label for="confirm-radio"></label>
            </div>
          </div>
          <div className="switch-wrap d-flex justify-content-between">
            <p>04. Disabled radio</p>
            <div className="disabled-radio">
              <input type="checkbox" id="disabled-radio" disabled />
              <label for="disabled-radio"></label>
            </div>
          </div>
          <div className="switch-wrap d-flex justify-content-between">
            <p>05. Disabled radio active</p>
            <div className="disabled-radio">
              <input
                type="checkbox"
                id="disabled-radio-active"
                checked
                disabled
              />
              <label for="disabled-radio-active"></label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

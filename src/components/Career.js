import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./component.css";
import axios from "axios";

// career page of a website
function Career() {
  const [count, setCount] = useState(0);
  const [job, setJob] = useState([]);
  const [query, setQuery] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedFunctions, setSelectedFunctions] = useState(null);
  const [departMent, setDepartment] = useState([]);
  const [location, setLocation] = useState([]);
  const [functions, setFunctions] = useState([]);

  const onChange = (e, type) => {
    switch (type) {
      case "department":
        setSelectedDepartment(e.target.value);
        break;
      case "location":
        setSelectedLocation(e.target.value);
        break;
      case "functions":
        setSelectedFunctions(e.target.value);
        break;
      case "query":
        setQuery(e.target.value);
        break;
    }
  };

  // API calls to get filter data
  const getDepartmentData = async () => {
    await axios
      .get("https://demo.jobsoid.com/api/v1/departments")
      .then(response => {
        setDepartment(response.data);
      })
      .catch(error => {});
  };

  const getFunctionData = async () => {
    await axios
      .get("https://demo.jobsoid.com/api/v1/functions")
      .then(response => {
        setFunctions(response.data);
      })
      .catch(error => {});
  };

  const getLocationData = async () => {
    await axios
      .get("https://demo.jobsoid.com/api/v1/locations")
      .then(response => {
        setLocation(response.data);
      })
      .catch(error => {});
  };

  // to get Url based in selected filter since API doesnot support if I am sending blank parameters for missing one
  const getUrl = () => {
    if (
      query &&
      !selectedDepartment &&
      !selectedFunctions &&
      !selectedLocation
    ) {
      return `https://demo.jobsoid.com/api/v1/jobs?q=${query}`;
    } else if (
      !query &&
      selectedDepartment &&
      !selectedFunctions &&
      !selectedLocation
    ) {
      return `https://demo.jobsoid.com/api/v1/jobs?dept=${selectedDepartment}`;
    } else if (
      !query &&
      !selectedDepartment &&
      !selectedFunctions &&
      selectedLocation
    ) {
      return `https://demo.jobsoid.com/api/v1/jobs?loc=${selectedLocation}`;
    } else if (
      !query &&
      !selectedDepartment &&
      selectedFunctions &&
      !selectedLocation
    ) {
      return `https://demo.jobsoid.com/api/v1/jobs?fun=${selectedFunctions}`;
    } else if (
      query &&
      selectedDepartment &&
      !selectedFunctions &&
      !selectedLocation
    ) {
      return `https://demo.jobsoid.com/api/v1/jobs?q=${query}&dept=${selectedDepartment}`;
    } else if (
      query &&
      !selectedDepartment &&
      selectedFunctions &&
      !selectedLocation
    ) {
      return `https://demo.jobsoid.com/api/v1/jobs?q=${query}&fun=${selectedFunctions}`;
    } else if (
      query &&
      !selectedDepartment &&
      !selectedFunctions &&
      !selectedLocation
    ) {
      return `https://demo.jobsoid.com/api/v1/jobs?q=${query}&loc=${selectedLocation}`;
    } else if (
      !query &&
      selectedDepartment &&
      selectedFunctions &&
      !selectedLocation
    ) {
      return `https://demo.jobsoid.com/api/v1/jobs?dept=${selectedDepartment}&fun=${selectedFunctions}`;
    } else if (
      !query &&
      selectedDepartment &&
      !selectedFunctions &&
      selectedLocation
    ) {
      return `https://demo.jobsoid.com/api/v1/jobs?dept=${selectedDepartment}&loc=${selectedLocation}`;
    } else if (
      query &&
      selectedDepartment &&
      selectedFunctions &&
      !selectedLocation
    ) {
      return `https://demo.jobsoid.com/api/v1/jobs?q=${query}dept=${selectedDepartment}&fun=${selectedFunctions}`;
    } else if (
      query &&
      selectedDepartment &&
      !selectedFunctions &&
      selectedLocation
    ) {
      return `https://demo.jobsoid.com/api/v1/jobs?q=${query}&dept=${selectedDepartment}&loc=${selectedFunctions}`;
    } else if (
      query &&
      selectedDepartment &&
      !selectedFunctions &&
      selectedLocation
    ) {
      return `https://demo.jobsoid.com/api/v1/jobs?q=${query}&dept=${selectedDepartment}&loc=${selectedLocation}`;
    } else if (
      !query &&
      selectedDepartment &&
      selectedFunctions &&
      selectedLocation
    ) {
      return `https://demo.jobsoid.com/api/v1/jobs?fun=${selectedFunctions}&dept=${selectedDepartment}&loc=${selectedLocation}`;
    } else if (
      !query &&
      selectedDepartment &&
      selectedFunctions &&
      selectedLocation
    ) {
      return `https://demo.jobsoid.com/api/v1/jobs?q=${query}&fun=${selectedFunctions}&dept=${selectedDepartment}&loc=${selectedLocation}`;
    }
  };

  const searchJobs = async () => {
    let url = getUrl();
    await axios
      .get(url)
      .then(response => {
        setJob(response.data);
        console.log(job);
      })
      .catch(error => {});
  };

  useEffect(async () => {
    await getDepartmentData();
    await getLocationData();
    await getFunctionData();
    if (query || selectedLocation || selectedDepartment || selectedFunctions) {
      searchJobs();
    }
  }, [query, selectedLocation, selectedDepartment, selectedFunctions]);

  return (
    <div className="container my-2 mainContent">
      <div class="row greyBackground">
        <div class="col-md-11">
          <input
            onChange={e => onChange(e, "query")}
            className="form-control"
            type="search"
            placeholder="Search for Job"
            aria-label="Search"
          />
        </div>
        <div class="col-md-1">
          <button
            type="button"
            class="btn btn-primary"
            onClick={e => searchJobs()}
          >
            Search
          </button>
        </div>
      </div>
      <div class="row greyBackground">
        <div class="col-md-4">
          <select
            class="form-select form-select-sm filterType"
            value={selectedDepartment}
            onChange={e => onChange(e, "department")}
            aria-label=".form-select-sm example"
          >
            <option disabled selected>
              Select Department
            </option>
            {departMent &&
              departMent.map(name => {
                return <option value={name.title}>{name.title}</option>;
              })}
          </select>
        </div>
        <div class="col-md-4">
          <select
            class="form-select form-select-sm filterType"
            value={selectedLocation}
            onChange={e => onChange(e, "location")}
            aria-label=".form-select-sm example"
          >
            <option disabled selected>
              Select Location
            </option>
            {location &&
              location.map(name => {
                return <option value={name.title}>{name.title}</option>;
              })}
          </select>
        </div>
        <div class="col-md-4">
          <select
            class="form-select form-select-sm filterType"
            value={selectedFunctions}
            onChange={e => onChange(e, "functions")}
            aria-label=".form-select-sm example"
          >
            <option disabled selected>
              Select Function
            </option>
            {functions &&
              functions.map(name => {
                return <option value={name.title}>{name.title}</option>;
              })}
          </select>
        </div>
        <div></div>
      </div>
      <div className="container row jobList">
        {job &&
          job.length > 0 &&
          job.map(job => {
            return (
              <>
                <div className="row mt-2">
                  <div class="col">
                    <span className="title">{job.title}</span>
                    <hr
                      style={{
                        width: "5%",
                        color: "#6295E3",
                        opacity: "inherit",
                        height: "4px",
                        marginTop: 0,
                        marginBottom: "10px"
                      }}
                    ></hr>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-8">
                    <i
                      class="fa fa-building"
                      style={{ color: "grey" }}
                      aria-hidden="true"
                    ></i>
                    <span className="slugName">{job.slug}</span>
                    <i
                      style={{ color: "grey" }}
                      class="fa fa-map-marker"
                      aria-hidden="true"
                    ></i>
                    <span className="location">
                      {job.location.country}, {job.location.city}
                    </span>
                  </div>
                  <div className="col-md-2">
                    <a className="buttonStyle" href={job.applyUrl}>
                      Apply Now
                    </a>
                  </div>
                  <div className="col-md-2">
                    <Link className="buttonStyle" to={`details/${job.id}`}>
                      Details
                    </Link>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}

export default Career;

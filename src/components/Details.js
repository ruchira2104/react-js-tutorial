import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Details() {
  const [details, setDetails] = useState([]);
  const [jobs, setJobs] = useState([]);
  useEffect(async () => {
    let url = window.location.href;
    let id = url.split("/")[5];
    await axios
      .get(`https://demo.jobsoid.com/api/v1/jobs/${id}`)
      .then(response => {
        setDetails(response.data);
      })
      .catch(error => {});

    await axios
      .get(`https://demo.jobsoid.com/api/v1/jobs`)
      .then(response => {
        setJobs(response.data);
      })
      .catch(error => {});
  }, []);

  return (
    <>
      {details && details.description ? (
        <div className="container my-2">
          <div className="row">
            <div className="col-md-8">
              <div className="row mt-2">
                <div className="col">
                  <span className="title">{details.title}</span>
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
                    className="fa fa-building"
                    style={{ color: "grey" }}
                    aria-hidden="true"
                  ></i>
                  <span className="slugName">{details.slug}</span>
                  <i
                    style={{ color: "grey" }}
                    className="fa fa-map-marker"
                    aria-hidden="true"
                  ></i>
                  <span className="location">
                    {details.location.country}, {details.location.city}
                  </span>
                </div>

                <div className="row my-2">
                  <div className="col-md-2">
                    <a className="buttonStyle" href={details.applyUrl}>
                      Apply Now
                    </a>
                  </div>
                </div>
              </div>
              <hr></hr>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${details && details.description}`
                }}
              ></div>
            </div>
            <div class="col-md-4">
              <div class="card" style={{background:'#F0F3FC'}}>
                <h5 class="card-header">Other Job Openings</h5>
                <div class="card-body">
                  {jobs &&
                    jobs.length > 0 &&
                    jobs.map(job => {
                      return (
                        <>
                          <h5 class="card-title">{job.title}</h5>
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
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>No details</div>
      )}
    </>
  );
}

export default Details;

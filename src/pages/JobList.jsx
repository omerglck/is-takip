import React, { useEffect } from "react";
import Card from "../components/Card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setError, setJobs } from "../redux/jobSlice";

const JobList = () => {
  const state = useSelector((store) => store);
  // console.log(state)
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3050/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      .catch((error) => dispatch(setError(error)));
  }, []);

  return (
    <div className="list-page">
      <h2 contentEditable="true">
        Bulunan (16) iş arasından (16) tanesini görüntülüyorsunuz.
      </h2>
      <section className="job-list">
        {/* API'dan cevap bekleniyorsa */}
        {!state.initialized && <p>Yükleniyor...</p>}
        {/* API'dan cevap gelir ise */}
        {state.initialized && !state.isError ? (
          state.jobs.map((job) => {
            return <Card key={job.id} job={job} />;
          })
        ) : (
          <p>Üzgünüz bir hata oluştu</p>
        )}
      </section>
    </div>
  );
};

export default JobList;

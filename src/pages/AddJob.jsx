import React from "react";
import { statusOptions, typeOptions } from "./../helpers/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addJob } from "../redux/jobSlice";

const AddJob = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // form datasını oluşturma
    const form = new FormData(e.target);

    const newJob = Object.fromEntries(form.entries());
    if (!newJob.type || !newJob.status) {
      toast.info("Tüm alanları doldurunuz!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    // id ekleme
    newJob.id = v4();
    // tarih ekleme
    newJob.date = new Date().toLocaleDateString();
    // console.log("job", newJob);

    axios
      .post("http://localhost:3050/jobs", newJob)
      .then(() => {
        // yeni işi store'a kaydetme
        dispatch(addJob(newJob))

        toast.success("İş başarılıyla eklendi.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate("/");
      })
      .catch((error) => toast.error("Beklenmedik bir hata oluştu..."));
  };
  return (
    <div className="add-sec">
      <div>
        <h2>Yeni iş ekle</h2>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Pozisyon</label>
          <input type="text" required name="position" />
        </div>
        <div>
          <label htmlFor="">Şirket</label>
          <input type="text" required name="company" />
        </div>
        <div>
          <label htmlFor="">Lokasyon</label>
          <input type="text" required name="location" />
        </div>
        <div>
          <label htmlFor="">Durum</label>
          <select name="status" id="">
            <option value="" selected disabled>
              Seçiniz
            </option>
            {statusOptions.map((status, i) => (
              <option key={i}>{status}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="">Tür</label>
          <select name="type" id="">
            <option value="" selected disabled>
              Seçiniz
            </option>
            {typeOptions.map((type, i) => (
              <option key={i}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <button>Ekle</button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;

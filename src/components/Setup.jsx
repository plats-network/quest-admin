import { DatePicker, Input } from "antd";
import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Upload } from "../assets/img";
import { setSaveSuccess, setStateSetup } from "../redux/stateCampaign";
import { callApiCreate } from "../services/callApiCreate";
import LogicHandleButton from "../utils/LogicHandleButton";
import { checkLogin } from "../utils/checkLogin";
import { checkTimeCampaign } from "../utils/checkTimeCampaign";
import { handleCheckDisable } from "../utils/handleDisableTask";
import { notifyError } from "../utils/toastify";

const IMAGE_MAX_SIZE = 5000000;

function Setup({ setValue, setValueSetup, data, onActive }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isDetail = location.pathname.includes("detail");
  // const isDetail = false;
  const [title, setTitle] = useState(data?.title || "");
  const [description, setDescription] = useState(data?.description || "");
  const [startDate, setStartDate] = useState(data?.startDate || "");
  const [endDate, setEndDate] = useState(data?.endDate || "");
  const { stateSetup } = useSelector((state) => state.stateCampaign);
  const [urlThumbnail, setUrlThumbnail] = useState("");
  const [base64Thumbnail, setBase64Thumbnail] = useState("");
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);

  const handleStartDate = (date) => {
    setStartDate(date.$d);
  };

  const handleEndDate = (date) => {
    setEndDate(date.$d);
  };
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      const url = URL.createObjectURL(acceptedFiles[0]);
      const reader = new FileReader();

      reader.onload = (event) => {
        const base64String = event.target.result;

        setBase64Thumbnail(base64String);
      };
      reader.readAsDataURL(acceptedFiles[0]);
      setUrlThumbnail(url);
    }
  }, []);

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp", ".gif", ".psd", ".svg", ".bmp"] },
    maxSize: IMAGE_MAX_SIZE
  });

  const handleNext = () => {
    if (title && description && startDate && endDate) {
      if (!checkTimeCampaign(startDate, endDate)) {
        return;
      }
      setValueSetup({
        title,
        description,
        startDate,
        endDate,
        base64Thumbnail,
        urlThumbnail
      });
      setValue("Quest");
      onActive((prev) => {
        const quest = prev[1];
        quest.isActive = true;
        return prev;
      });
      dispatch(setStateSetup(true));
    } else {
      notifyError("Please complete all information !");
    }
  };

  const handleSave = async () => {
    if (!checkLogin()) {
      notifyError("Please connect wallet first");
      return;
    }
    if (title && description && startDate && endDate) {
      const res = await callApiCreate({ title, description, startDate, endDate, base64Thumbnail });
      if (res.data.status === "success") {
        navigate("/campaign");
        dispatch(setSaveSuccess(true));
      }
    } else {
      notifyError("Please complete all information !");
    }
  };

  const handleEdit = () => {
    if (isEdit) {
      handleNext();
    } else {
      setIsEdit(true);
    }
  };

  useEffect(() => {
    setTitle(data?.title);
    setDescription(data?.description);
    setEndDate(data?.endDate);
    setStartDate(data?.startDate);
    setUrlThumbnail(data?.urlThumbnail);
  }, [data?.title]);

  const handleCreateEdit = () => {
    dispatch(setStateSetup(false));
  };

  return (
    <div className="">
      <div className="mt-5 w-full border-[1px] border-[#279EFF] py-2 px-4 md:py-6 md:px-8 rounded-lg">
        <div className="mb-4 md:mb-6">
          <label htmlFor="default-input" className="heading after:content-['*'] after:ml-1 after:text-red-500">
            Title
          </label>
          <Input
            disabled={handleCheckDisable(isDetail, isEdit, stateSetup)}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="!leading-9 md:leading-[50px] placeholder:text-[18px] text-[18px]"
          />
        </div>

        <div>
          <label htmlFor="message" className="heading after:content-['*'] after:ml-1 after:text-red-500">
            Description
          </label>
          <Input.TextArea
            disabled={handleCheckDisable(isDetail, isEdit, stateSetup)}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-10 mt-3 md:mt-5 w-full">
          <div className="w-full">
            <label className="block heading after:content-['*'] after:ml-1 after:text-red-500">Start Date</label>
            <DatePicker
              disabled={handleCheckDisable(isDetail, isEdit, stateSetup)}
              value={startDate ? dayjs(startDate) : ""}
              onChange={handleStartDate}
              size="large"
              className="w-full p-3"
            />
          </div>
          <div className="w-full">
            <label className="block heading after:content-['*'] after:ml-1 after:text-red-500">End Date</label>
            <DatePicker
              disabled={handleCheckDisable(isDetail, isEdit, stateSetup)}
              value={endDate ? dayjs(endDate) : ""}
              onChange={handleEndDate}
              size="large"
              className="w-full p-3 text-white"
            />
          </div>
        </div>
        <div className="w-full mt-4 relative">
          <label className="block heading">Upload Thumbnail</label>
          <div
            style={{ userSelect: "none" }}
            disabled
            className="w-full md:w-[40%] border-dashed border-2 border-yellow-400 rounded-xl p-4 cursor-pointer flex flex-col items-center max-h-[200px] md:max-h-[400px] overflow-hidden"
            {...getRootProps()}
          >
            {!stateSetup && (
              <div
                style={{ display: urlThumbnail || data?.urlThumbnail ? "none" : "" }}
                className="flex flex-col items-center"
              >
                <p className="text-white">JPG, PNG, WEBM, MAX 100MB</p>
                <img src={Upload} className="w-[40px] md:w-[80px] m-2 " />
                <p className="text-white">Drag & drop file here</p>
                <p className="text-white">or Browser media on your device</p>
                <input {...getInputProps()} />
              </div>
            )}
            <div>
              <img src={urlThumbnail} className="object-contain max-h-[300px] md:max-h-[360px]" loading="lazy" />
            </div>
          </div>
          {handleCheckDisable(isDetail, isEdit, stateSetup) && <div className="absolute inset-0 z-50"></div>}
        </div>
      </div>

      {/* nếu không phải là màn detail */}
      <LogicHandleButton
        isDetail={isDetail}
        data={data}
        isEdit={isEdit}
        handleEdit={handleEdit}
        startDate={startDate}
        handleCreateEdit={handleCreateEdit}
        handleNext={handleNext}
        handleSave={handleSave}
        state={stateSetup}
      />

      <ToastContainer />
    </div>
  );
}

export default Setup;

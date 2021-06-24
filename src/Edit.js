import "./App.css";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import axios from "axios";
import { Button, Form } from "react-bootstrap";
import { observer, inject } from "mobx-react";
require("moment/locale/th.js");

const Edit = observer((props) => {
  moment.locale("th");
  const [name, setName] = useState("");
  const [submitFile, setSubmitFile] = useState(false);
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [access_token, storeAccessToken] = useState(
    localStorage.getItem("access_token")
  ); // eslint-disable-line

  const [showFileTrans, setShowFile] = useState(true);

  let [chooseFile, addChooseFile] = useState([]);

  const [projName, setProjName] = useState([]);
  const [selectedTatiFilm, setSelectedTatiFilm] = useState(
    props.GetListAllStore.fileName
  );

  const other = [
    {
      id: 3,
      name: "รับงาน",
    },
    {
      id: 5,
      name: "ปฏิเสธงาน",
    },
  ];

  const accept = [
    {
      id: 4,
      name: "ส่งงาน",
    },
    {
      id: 5,
      name: "ปฏิเสธงาน",
    },
  ];

  const [disTH, setdisTH] = useState(" ");
  const [disEng, setdisEng] = useState(" ");
  const [disComEng, setdisComEng] = useState(" ");
  const [status_id, setStatusid] = useState("");
  const [translatorStatus] = useState(
    props.GetListAllStore.statusRequest === 3 ? accept : other
  );
  const [selectedStatus, setSelectedStatus] = useState(
    props.GetListAllStore.statusRequest === 3
      ? translatorStatus[1]
      : translatorStatus[0]
  );

  const [checkTH, isCheckTH] = useState(
    props.GetListAllStore.thaiToEng ? true : false
  );
  const [checkEng, isCheckEng] = useState(
    props.GetListAllStore.engToThai ? true : false
  );
  const [checkComEng, isCheckComEng] = useState(
    props.GetListAllStore.composeEng ? true : false
  );
  const [validated, setValidated] = useState(false);
  const [attachments] = useState(props.GetListAllStore.attachments);
  const [translator_attachments] = useState(
    props.GetListAllStore.translator_attachments
  );

  let refTHtoE = useRef();
  let refEtoTH = useRef();
  let refComposeEng = useRef();
  let refDate = useRef();
  let refFile = useRef();
  let refTxtname = useRef();
  let refTxtnote = useRef();
  let refProjName = useRef();
  let refTranslatorStatus = useRef();
  let refForm = useRef();

  const printBtn = () => {
    var para = document.createElement("input");
    para.type = "file";
    document.getElementById("showItemFile").appendChild(para);
    document
      .getElementById("showItemFile")
      .addEventListener("change", (e) => handleFile(e));
  };

  const handleClose = () => {
    props.AddNewStore.storeClose();
  };

  const getUser = () => {
    axios
      .get("/api/v1/auth/user", {
        headers: {
          Authorization: "Bearer " + props.GetListAllStore.access_token,
        },
      })
      .then(function (response) {
        console.log(response.data);
        const data = response.data.data;
        setName(data.name);
        setPosition(data.position);
        setDepartment(data.department);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const requestUpdateStatus = (event) => {
    event.preventDefault();
    let formData = new FormData();
    let i = refTranslatorStatus.current.selectedIndex;
    let label = refTranslatorStatus.current[i].label;
    if (event.target.id === "submitHeadApprove") {
      props.GetListAllStore.storeSuccessTitle("อนุญาตงาน");
      formData.append("status_id", 2);
      formData.append("id", props.GetListAllStore.id);
      requestUpdateOnlyStatus(formData);
    } else if (event.target.id === "submitHeadReject") {
      formData.append("status_id", 5);
      props.GetListAllStore.storeSuccessTitle("ปฏิเสธงาน");
      formData.append("id", props.GetListAllStore.id);
      requestUpdateOnlyStatus(formData);
    } else {
      let attachment = chooseFile;
      props.GetListAllStore.storeSuccessTitle(label);
      for (var j = 0; j < attachment.length; j++) {
        let file = attachment[j];
        formData.append("attachment[" + j + "]", file);
      }
      if (attachment.length !== 0) {
        formData.append("status_id", refTranslatorStatus.current.value);
        requestUpdateStatusAndFile(formData);
        setSubmitFile(false);
      } else {
        formData.append("status_id", refTranslatorStatus.current.value);
        formData.append("id", props.GetListAllStore.id);
        requestUpdateOnlyStatus(formData);
        setSubmitFile(false);
      }
    }
  };

  const requestUpdateStatusAndFile = (formData) => {
    axios
      .post(
        "/api/translate/v1/translator/" + props.GetListAllStore.id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + props.GetListAllStore.access_token,
          },
        }
      )
      .then(function (response) {
        if (response.status === 200) {
          console.log(response);
          handleClose();
        }
      })
      .catch(function (error) {
        console.log("Error", error);
        alert(error);
      });
  };

  const requestUpdateOnlyStatus = (formData) => {
    axios
      .post("/api/translate/v1/status", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + props.GetListAllStore.access_token,
        },
      })
      .then(function (response) {
        if (response.status === 200) {
          console.log(response);
          handleClose();
        }
      })
      .catch(function (error) {
        console.log("Error", error);
        alert(error);
      });
  };

  const getProject = () => {
    axios
      .get("/api/translate/v1/projects", {
        headers: {
          Authorization: "Bearer " + props.GetListAllStore.access_token,
        },
      })
      .then(function (response) {
        console.log(response.data);
        const data = response.data;
        setProjName(data);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const showFile = () => {
    var i;
    for (i = 0; i < attachments.length; i++) {
      const anchor = document.createElement("a");
      const list = document.getElementById("linksList");
      const li = document.createElement("li");
      anchor.href =
        "https://api.rihes.cmu.ac.th/upload/translate/" + attachments[i].name;
      anchor.innerText = attachments[i].name;
      li.appendChild(anchor);
      list.appendChild(li);
    }
  };

  const showTranslatedFile = () => {
    var i;
    for (i = 0; i < translator_attachments.length; i++) {
      const anchor = document.createElement("a");
      const list = document.getElementById("linksList");
      const li = document.createElement("li");
      anchor.href =
        "https://api.rihes.cmu.ac.th/upload/translate/" +
        translator_attachments[i].name;
      anchor.innerText = translator_attachments[i].name;
      li.appendChild(anchor);
      list.appendChild(li);
    }
  };

  useEffect(() => {
    showTranslatedFile();
    showFile();
    getUser();
    getProject();

    refTHtoE.current.value = props.GetListAllStore.thaiToEng
      ? props.GetListAllStore.thaiToEng
      : 0;
    refEtoTH.current.value = props.GetListAllStore.engToThai
      ? props.GetListAllStore.engToThai
      : 0;
    refComposeEng.current.value = props.GetListAllStore.composeEng
      ? props.GetListAllStore.composeEng
      : 0;
    refTxtname.current.value = props.GetListAllStore.projName;
    refTxtnote.current.value = props.GetListAllStore.note;
    document.getElementById("done_at").value = moment(
      props.GetListAllStore.doneAt
    ).format("YYYY-MM-DD");
  }, []);

  const handleFile = (e) => {
    let storeFile = [];
    for (var i = 0; i < e.target.files.length; i++) {
      let file = e.target.files[i];
      if (file !== undefined) {
        storeFile.push(file);
        addChooseFile([...chooseFile, file]);
      } else {
        document
          .getElementById("showItemFile")
          .removeChild(
            document.getElementById("showItemFile").lastElementChild
          );
      }
    }
  };

  const requestSubmit = async (event) => {
    if (status_id === "0") {
      props.GetListAllStore.storeSuccessTitle("บันทึกแบบฟอร์ม");
    } else {
      props.GetListAllStore.storeSuccessTitle("ส่งแบบฟอร์ม");
    }
    event.preventDefault();
    let attachment = chooseFile;
    let formData = new FormData();
    formData.append("txtProject_name", refProjName.current.value);
    formData.append("txtName", refTxtname.current.value);
    formData.append("thai_to_eng_page", refTHtoE.current.value);
    formData.append("eng_to_thai_page", refEtoTH.current.value);
    formData.append("compose_doc_page", refComposeEng.current.value);
    formData.append("done_at", refDate.current.value);
    formData.append("txtNote", refTxtnote.current.value);
    for (var i = 0; i < attachment.length; i++) {
      let file = attachment[i];
      formData.append("attachment[" + i + "]", file);
    }
    formData.append("status_id", status_id);
    // axios.defaults.withCredentials = true;
    await axios
      .post(
        "/api/translate/v1/translate/" + props.GetListAllStore.id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + props.GetListAllStore.access_token,
          },
        }
      )
      .then(function (response) {
        if (response.status === 200) {
          console.log(response);
          handleClose();
        }
      })
      .catch(function (error) {
        console.log("Error", error);
        alert(error);
      });
  };

  const deleteSubmit = async (event) => {
    props.GetListAllStore.storeSuccessTitle("ลบแบบฟอร์ม");
    event.preventDefault();
    await axios
      .delete("/api/translate/v1/translate/" + props.GetListAllStore.id, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + props.GetListAllStore.access_token,
        },
      })
      .then(function (response) {
        console.log(response);
        handleClose();
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  const handleSubmit = async (event) => {
    if (event.target.id === "submitformSave") {
      setStatusid("0");
    }
    if (event.target.id === "submitformSend") {
      setStatusid("1");
    }
    if (event.target.id === "submitTranslatorSave") {
      setSubmitFile(true);
    }
    if (event.target.id === "submitformDelete") {
      deleteSubmit(event);
    }
    try {
      const form = event.currentTarget;
      props.AddNewStore.storeValidate(true);
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        props.AddNewStore.storeValidate(false);
        props.AddNewStore.clearIsFirst();
      } else {
        setValidated(true);
        props.AddNewStore.storeIsFirst(props.AddNewStore.isFirst + 1);
        if (props.AddNewStore.isValidate && props.AddNewStore.isFirst === 2) {
          if (submitFile) {
            requestUpdateStatus(event);
            props.AddNewStore.clearIsFirst();
          } else {
            requestSubmit(event);
            props.AddNewStore.clearIsFirst();
            return false;
          }
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  const selectOnchange = (e) => {
    setSelectedStatus(
      translatorStatus.find(
        (translatorStatus) => translatorStatus.id === e.target.value
      )
    );

    if (e.target.value === "4") {
      setShowFile(true);
    } else setShowFile(false);
  };
  return (
    <Form
      noValidate
      validated={validated}
      onSubmit={handleSubmit}
      ref={refForm}
    >
      <div class="animated fadeInRight m-t">
        <div class="mail-box ml-3 mr-3 mt-3" style={{ marginBottom: 32 }}>
          <div class="mail-body">
            <div class="form-group row">
              <label
                for="txtCreated_at"
                class="col-sm-2 control-label"
                style={{ alignSelf: "center" }}
              >
                วันที่:
              </label>
              <div class="col-sm-10">
                <input
                  type="text"
                  class="form-control"
                  placeholder=""
                  value={props.GetListAllStore.createdAt}
                  id="txtCreated_at_label"
                  readonly
                  disabled
                />
                <input
                  type="hidden"
                  class="form-control"
                  placeholder="dd/mm/yyyy"
                  id="txtCreated_at"
                  name="txtCreated_at"
                  data-mask="99/99/9999"
                  readonly
                />
              </div>
            </div>
            <div class="form-group row">
              <label
                for="ddlLeaveTypeId"
                class="col-sm-2 control-label"
                style={{ alignSelf: "center" }}
              >
                เรื่อง:
              </label>
              <div class="col-sm-10">
                <input
                  name="txtTitle1"
                  id="txtTitle1"
                  type="text"
                  class="form-control"
                  value="ขอใช้บริการแปล-เรียบเรียงเอกสาร"
                  readOnly
                />
              </div>
            </div>
            <div class="form-group row">
              <label
                for="txtHead"
                class="col-sm-2 control-label"
                style={{ alignSelf: "center" }}
              >
                เรียน:
              </label>
              <div class="col-sm-10">
                <input
                  name="txtHead"
                  id="txtHead"
                  type="text"
                  class="form-control"
                  value="หัวหน้างานบริหารงานวิจัย บริหารวิชาการและวิเทศสัมพันธ์"
                  readOnly
                />
              </div>
            </div>
            <div class="form-group row">
              <label
                for="txtEmpName"
                class="col-sm-2 control-label"
                style={{ alignSelf: "center" }}
              >
                ข้าพเจ้า:
              </label>
              <div class="col-sm-10">
                <input
                  name="txtEmpName"
                  id="txtEmpName"
                  type="text"
                  value={name}
                  readOnly
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group row">
              <label
                for="txtEmpPosition"
                class="col-sm-2 control-label"
                style={{ alignSelf: "center" }}
              >
                ตำแหน่ง:
              </label>
              <div class="col-sm-10">
                <input
                  name="txtEmpPosition"
                  id="txtEmpPosition"
                  type="text"
                  value={position}
                  readOnly
                  class="form-control"
                />
              </div>
            </div>
            <div class="form-group row">
              <label
                for="txtEmpOrgid"
                class="col-sm-2 control-label"
                style={{ alignSelf: "center" }}
              >
                สังกัด:
              </label>
              <div class="col-sm-10">
                <input
                  name="txtEmpOrgid"
                  id="txtEmpOrgid"
                  type="text"
                  class="form-control"
                  value={department}
                  readOnly
                />
              </div>
            </div>
            <div class="form-group row">
              <hr />
            </div>
            <div class="form-group row">
              <label for="txtProject" class="col-sm-2 control-label">
                มีความประสงค์ขอใช้บริการเพื่อใช้ในงาน/โครงการ*:
              </label>
              <div class="col-sm-10">
                <select
                  ref={refProjName}
                  class="custom-select"
                  value={selectedTatiFilm}
                  onChange={(e) =>
                    setSelectedTatiFilm(
                      projName.find(
                        (projName) => projName.id === e.target.value
                      )
                    )
                  }
                  disabled
                >
                  {projName.map((projName) => (
                    <option key={projName.id} value={projName.name}>
                      {projName.name}
                    </option>
                  ))}
                </select>
                <div class="invalid-feedback">ห้ามว่าง.</div>
              </div>
            </div>
            <div class="form-group row">
              <label
                for="txtName"
                class="col-sm-2 control-label"
                style={{ alignSelf: "center" }}
              >
                ชื่อเอกสาร:
              </label>
              <div class="col-sm-10" id="checkInput">
                <input
                  ref={refTxtname}
                  name="txtName"
                  id="txtName"
                  type="text"
                  class="form-control"
                  required
                  disabled
                />
                <Form.Control.Feedback type="invalid">
                  ห้ามว่าง.
                </Form.Control.Feedback>
              </div>
            </div>
            <div class="form-group row mt-4">
              <label for="txtEmpOrgid" class="col-sm-2 control-label mt-2">
                1. แปลเอกสาร:
              </label>
              <div class="col-sm-10">
                <div class="form-inline">
                  <input
                    ref={refTHtoE}
                    id="thai_to_eng_page_title"
                    name="thai_to_eng_page_title"
                    value="0"
                    checked={checkTH}
                    type="checkbox"
                    class="sickstate"
                    onChange={(e) => {
                      if (!checkTH) {
                        setdisTH("");
                        isCheckTH(true);
                      } else {
                        setdisTH(" ");
                        refTHtoE.current.value = 0;
                        isCheckTH(false);
                      }
                    }}
                    style={{ marginRight: 8 }}
                    disabled
                  />
                  ภาษาไทยเป็นภาษาอังกฤษ โดยมีต้นฉบับภาษาไทย{" "}
                  <span class="ml-5">จำนวน</span>{" "}
                  <input
                    ref={refTHtoE}
                    name="eng_to_thai_page"
                    id="eng_to_thai_page"
                    class="form-control  ml-1 mr-1"
                    style={{ width: 100 }}
                    type="number"
                    pattern="[0-9]*"
                    inputmode="numeric"
                    min={0}
                    disabled={disTH}
                  />{" "}
                  หน้า
                </div>
                <div class="form-inline mt-2">
                  <input
                    id="eng_to_thai_page_title"
                    name="eng_to_thai_page_title"
                    type="checkbox"
                    checked={checkEng}
                    class="sickstate"
                    onChange={(e) => {
                      if (!checkEng) {
                        setdisEng("");
                        isCheckEng(true);
                      } else {
                        setdisEng(" ");
                        refEtoTH.current.value = 0;
                        isCheckEng(false);
                      }
                    }}
                    style={{ marginRight: 8 }}
                    disabled
                  />
                  ภาษาอังกฤษเป็นภาษาไทย โดยมีต้นฉบับภาษาอังกฤษ{" "}
                  <span class="ml-4">จำนวน</span>{" "}
                  <input
                    ref={refEtoTH}
                    name="eng_to_thai_page"
                    id="eng_to_thai_page"
                    class="form-control  ml-1 mr-1"
                    style={{ width: 100 }}
                    type="number"
                    pattern="[0-9]*"
                    inputmode="numeric"
                    min={0}
                    disabled={disEng}
                  />
                  หน้า
                </div>
              </div>
            </div>
            <div class="form-group row mt-2">
              <label for="txtEmpOrgid" class="col-sm-2 control-label mt-2">
                2. การเรียบเรียงเอกสาร (Edit):
              </label>
              <div class="col-sm-10">
                <div class="form-inline">
                  <input
                    id="compose_doc_page_title"
                    name="compose_doc_page_title"
                    value="1"
                    type="checkbox"
                    class="sickstate"
                    checked={checkComEng}
                    onChange={(e) => {
                      if (!checkComEng) {
                        setdisComEng("");
                        isCheckComEng(true);
                      } else {
                        setdisComEng(" ");
                        refComposeEng.current.value = 0;
                        isCheckComEng(false);
                      }
                    }}
                    style={{ marginRight: 8 }}
                    disabled
                  />
                  โดยมีต้นฉบับภาษาอังกฤษ <span class="ml-5">จำนวน</span>{" "}
                  <input
                    ref={refComposeEng}
                    name="eng_to_thai_page"
                    id="eng_to_thai_page"
                    class="form-control  ml-1 mr-1"
                    style={{ width: 100 }}
                    type="number"
                    pattern="[0-9]*"
                    inputmode="numeric"
                    min={0}
                    disabled={disComEng}
                  />{" "}
                  หน้า
                </div>
              </div>
            </div>

            {props.GetListAllStore.statusRequest !== 4 && (
              <div class="form-group row mt-4">
                <label for="txtNote" class="col-sm-2 control-label">
                  ไฟล์ที่แนบมา:
                  <small>(กดที่ชื่อไฟล์เพื่อดาวน์โหลด)</small>{" "}
                </label>
                <div class="col-sm-10" id="downloadFile">
                  <div id="linksList"></div>
                  {attachments.length === 0 && <hr></hr>}
                </div>
              </div>
            )}

            {props.GetListAllStore.statusRequest === 4 && (
              <div class="form-group row mt-4">
                <label for="txtNote" class="col-sm-2 control-label">
                  ไฟล์ที่แนบมา
                  <p>(ไฟล์ที่แปลเรียบร้อย):</p>
                  {/* <small>(กดที่ชื่อไฟล์เพื่อดาวน์โหลด)</small>{" "} */}
                </label>
                <div class="col-sm-10" id="downloadFile">
                  <div id="linksList"></div>
                  {translator_attachments.length === 0 && <hr></hr>}
                </div>
              </div>
            )}

            <div class="form-group row mt-4">
              <label for="done_at" class="col-sm-2 control-label">
                ต้องการรับเอกสาร ที่ดำเนินการแล้วในวันที่:
              </label>
              <div class="col-sm-10">
                <input
                  ref={refDate}
                  type="date"
                  class="form-control"
                  id="done_at"
                  name="done_at"
                  // onChange={() => alert(refDate.current.value)}
                  data-mask="99/99/9999"
                  style={{ width: 200 }}
                  required
                  disabled
                />
              </div>
            </div>
            <div class="form-group row">
              <label for="txtNote" class="col-sm-2 control-label">
                หมายเหตุ :
              </label>
              <div class="col-sm-10">
                <textarea
                  ref={refTxtnote}
                  name="txtNote"
                  id="txtNote"
                  cols="30"
                  rows="2"
                  class="form-control"
                  disabled
                ></textarea>
              </div>
            </div>

            <div class="form-group row">
              <label class="col-sm-2 control-label"></label>
              <div class="col-sm-10">
                <p class="m-t bg-muted p-sm">
                  {"ผู้แปล: " +
                    (props.GetListAllStore.translator
                      ? props.GetListAllStore.translator
                      : "-") +
                    " โดยได้ส่งเอกสารมายัง  j_jea@rihes.org CC: ariya@rihes.org และ venus@rihes.org"}
                </p>
              </div>
            </div>
            {/* <div class="mail-body text-right tooltip-demo mb-3">
              <Button
                id="submitformSave"
                type="submit"
                class="btn  btn-primary"
                data-toggle="tooltip"
                data-placement="top"
                title="บันทึก"
                onClick={(e) => handleSubmit(e)}
                disabled
              >
                <i class="fa fa-save mr-2"></i>บันทึก
              </Button>
              <Button
                id="submitformSend"
                variant="success"
                type="submit"
                class="btn  btn-primary"
                style={{ marginLeft: 16 }}
                onClick={(e) => handleSubmit(e)}
              >
                <i class="fa fa-send mr-2"></i>ส่ง
              </Button>

              <Button
                id="submitformDelete"
                variant="danger"
                type="submit"
                class="btn  btn-primary"
                onClick={(e) => handleSubmit(e)}
                style={{ marginLeft: 16 }}
              >
                <i class="fa fa-trash mr-2"></i>ลบ
              </Button>
            </div> */}
            <div class="clearfix"></div>
          </div>
        </div>
        <hr></hr>
      </div>
      <div class="animated fadeInRight m-t">
        <div class="mail-box ml-3 mr-3 mt-3">
          <div class="mail-body">
            <div class="mb-3">
              <h4>สำหรับเจ้าหน้าที่</h4>
            </div>
            <div class="form-group row ">
              <label
                for="txtProject"
                class="col-sm-2 control-label mt-2 center"
                style={{ alignSelf: "center" }}
              >
                สถานะงาน:
              </label>
              <div class="col-sm-10 mt-3 mb-3">
                <select
                  ref={refTranslatorStatus}
                  class="custom-select"
                  value={selectedStatus}
                  onChange={(e) => selectOnchange(e)}
                  disabled={
                    props.GetListAllStore.statusRequest === 4 ? true : false
                  }
                >
                  {translatorStatus.map((translatorStatus) => (
                    <option
                      key={translatorStatus.id}
                      value={translatorStatus.id}
                    >
                      {translatorStatus.name}
                    </option>
                  ))}
                </select>
                <div class="invalid-feedback">ห้ามว่าง.</div>
              </div>
            </div>
            {showFileTrans && props.GetListAllStore.statusRequest === 3 && (
              <div class="form-group row mt-4">
                <label for="txtNote" class="col-sm-2 control-label">
                  เลือกไฟล์แนบ:
                  <small>(เอกสารที่แปลเรียบร้อยแล้ว)</small>{" "}
                </label>
                <div class="col-sm-10">
                  <div id="showItemFile">
                    {" "}
                    <input
                      ref={refFile}
                      name="itemFile[]"
                      type="file"
                      class="form-control-file"
                      onChange={(e) => handleFile(e)}
                      style={{ width: 300 }}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      ห้ามว่าง.
                    </Form.Control.Feedback>
                  </div>

                  <button
                    id="itemFileAdd"
                    type="button"
                    class="btn btn-secondary btn-sm m-2"
                    onClick={
                      () => printBtn()
                      // addChooseFile({name:'t',namee:'t'})
                    }
                  >
                    เพิ่มไฟล์อีก
                  </button>
                </div>
              </div>
            )}

            <div class="mail-body text-right tooltip-demo mb-3">
              <Button
                id="submitTranslatorSave"
                type="submit"
                class="btn  btn-primary"
                data-toggle="tooltip"
                data-placement="top"
                title="บันทึก"
                disabled={
                  props.GetListAllStore.statusRequest === 4 ? true : false
                }
                onClick={(e) => handleSubmit(e)}
              >
                <i class="fa fa-save mr-2"></i>บันทึก
              </Button>
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
        <hr></hr>
      </div>
      <div class="animated fadeInRight m-t">
        <div class="mail-box ml-3 mr-3 mt-3 mb-3">
          <div class="mail-body text-left">
            <div class="mb-3">
              <h4>สำหรับหัวหน้า</h4>
            </div>

            <div
              class="mail-body text-center tooltip-demo mb-3"
              style={{ marginTop: 32 }}
            >
              <Button
                id="submitHeadApprove"
                variant="success"
                type="submit"
                class="btn  btn-success mr-3"
                data-toggle="tooltip"
                data-placement="top"
                disabled={
                  props.GetListAllStore.statusRequest === 4 ? true : false
                }
                onClick={(e) => requestUpdateStatus(e)}
              >
                <i class="fa fa-check mr-2"></i>อนุญาต
              </Button>
              <Button
                id="submitHeadReject"
                variant="danger"
                type="submit"
                class="btn  btn-danger ml-3 "
                data-toggle="tooltip"
                data-placement="top"
                disabled={
                  props.GetListAllStore.statusRequest === 4 ? true : false
                }
                style={{ marginLeft: 16 }}
                onClick={(e) => requestUpdateStatus(e)}
              >
                <i class="fa fa-times-circle mr-2"></i>ไม่อนุญาต
              </Button>
            </div>
            <div class="clearfix"></div>
          </div>
        </div>
      </div>
    </Form>
  );
});

export default inject("AddNewStore", "GetListAllStore")(Edit);

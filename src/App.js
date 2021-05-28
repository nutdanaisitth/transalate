import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

function App() {
  const [log, setLog] = useState("");
  const [prevVal, setPrevVal] = useState(0);

  const setLogIfArrowClicked = e => {
    const currentVal = e.target.value;
    if (currentVal - prevVal === 1) {
      setLog(log + 1);
    } else if (currentVal - prevVal === -1) {
      setLog(log - 1);
    }
    setPrevVal(currentVal);
  };

  return (
    <div class="animated fadeInRight m-t">
      <div class="mail-box">
        <div class="mail-body">
          <div class="form-group row">
            <label for="txtCreated_at" class="col-sm-2 control-label">
              วันที่:
            </label>
            <div class="col-sm-10">
              <input
                type="text"
                class="form-control"
                placeholder=""
                id="txtCreated_at_label"
                readonly
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
            <label for="ddlLeaveTypeId" class="col-sm-2 control-label">
              เรื่อง:
            </label>
            <div class="col-sm-10">
              <input
                name="txtTitle1"
                value="ขอใช้บริการแปล-เรียบเรียงเอกสาร"
                id="txtTitle1"
                type="text"
                class="form-control"
                readonly
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="txtะนHead" class="col-sm-2 control-label">
              เรียน:
            </label>
            <div class="col-sm-10">
              <input
                name="txtHead"
                value="หัวหน้างานบริหารงานวิจัย บริหารวิชาการและวิเทศสัมพันธ์"
                id="txtHead"
                type="text"
                class="form-control"
                readonly
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="txtEmpName" class="col-sm-2 control-label">
              ข้าพเจ้า:
            </label>
            <div class="col-sm-10">
              <input
                name="txtEmpName"
                value=""
                id="txtEmpName"
                type="text"
                class="form-control"
                readonly
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="txtEmpPosition" class="col-sm-2 control-label">
              ตำแหน่ง:
            </label>
            <div class="col-sm-10">
              <input
                name="txtEmpPosition"
                value=""
                id="txtEmpPosition"
                type="text"
                class="form-control"
                readonly
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="txtEmpOrgid" class="col-sm-2 control-label">
              สังกัด:
            </label>
            <div class="col-sm-10">
              <input
                name="txtEmpOrgid"
                value=""
                id="txtEmpOrgid"
                type="text"
                class="form-control"
                readonly
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
                name="txtProject"
                id="txtProject"
                class="custom-select"
                required
              >
                <option selected></option>
              </select>
              <div class="invalid-feedback">ห้ามว่าง.</div>
            </div>
          </div>
          <div class="form-group row">
            <label for="txtName" class="col-sm-2 control-label">
              ชื่อเอกสาร:
            </label>
            <div class="col-sm-10">
              <input
                name="txtName"
                id="txtName"
                type="text"
                class="form-control"
                required
              />
              <div class="invalid-feedback">ห้ามว่าง.</div>
            </div>
          </div>
          <div class="form-group row mt-4">
            <label for="txtEmpOrgid" class="col-sm-2 control-label">
              1. แปลเอกสาร:
            </label>
            <div class="col-sm-10">
              <div class="form-inline">
                <input
                  id="thai_to_eng_page_title"
                  name="thai_to_eng_page_title"
                  value="1"
                  type="checkbox"
                  class="sickstate"
                />
                ภาษาไทยเป็นภาษาอังกฤษ โดยมีต้นฉบับภาษาไทย{" "}
                <span class="ml-5">จำนวน</span>{" "}
                <input
                  name="thai_to_eng_page"
                  id="thai_to_eng_page"
                  class="form-control  ml-1 mr-1"
                  style={{ width: 100 }}
                  type="number"
                  value="0"
                  maxlength="4"
                  max="1000"
                  min="1"
                  disabled
                />{" "}
                หน้า
              </div>
              <div class="form-inline mt-2">
                <input
                  id="eng_to_thai_page_title"
                  name="eng_to_thai_page_title"
                  value="1"
                  type="checkbox"
                  class="sickstate"
                />{" "}
                ภาษาอังกฤษเป็นภาษาไทย โดยมีต้นฉบับภาษาอังกฤษ{" "}
                <span class="ml-4">จำนวน</span>{" "}
                <input
                  name="eng_to_thai_page"
                  id="eng_to_thai_page"
                  class="form-control  ml-1 mr-1"
                  style={{ width: 100 }}
                  type="number"
                  maxlength={4}
                  max={1000}
                  min={1}
                  // onChange={()=>setLogIfArrowClicked()}
                  onChange={e => {
                    setLog(log);
                  }}
                  // onMouseDownCapture={()=> alert('yyy')}
                />
                      <span>{log}</span>
                {" "}
                หน้า
              </div>
            </div>
          </div>
          <div class="form-group row mt-2">
            <label for="txtEmpOrgid" class="col-sm-2 control-label">
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
                />
                โดยมีต้นฉบับภาษาอังกฤษ <span class="ml-5">จำนวน</span>{" "}
                <input
                  name="compose_doc_page"
                  id="compose_doc_page"
                  class="form-control  ml-1 mr-1"
                  style={{ width: 100 }}
                  type="number"
                  value="0"
                  maxlength="4"
                  max="1000"
                  min="1"
                  disabled
                />{" "}
                หน้า
              </div>
            </div>
          </div>

          <div class="form-group row mt-4">
            <label for="txtNote" class="col-sm-2 control-label">
              ไฟล์แนบ:
              <small>(เอกสารที่ต้องการแปล)</small>{" "}
            </label>
            <div class="col-sm-10">
              <div id="showItemFile">
                {" "}
                <input
                  name="itemFile[]"
                  type="file"
                  class="form-control-file"
                />
              </div>

              <button
                id="itemFileAdd"
                type="button"
                class="btn btn-secondary btn-sm m-2"
              >
                เพิ่มไฟล์อีก
              </button>
            </div>
          </div>

          <div class="form-group row mt-4">
            <label for="done_at" class="col-sm-2 control-label">
              ต้องการรับเอกสาร ที่ดำเนินการแล้วในวันที่:
            </label>
            <div class="col-sm-10">
              <input
                type="date"
                class="form-control"
                placeholder="dd/mm/yyyy"
                id="done_at"
                name="done_at"
                data-mask="99/99/9999"
                style={{ width: 200 }}
                required
              />
            </div>
          </div>
          <div class="form-group row">
            <label for="txtNote" class="col-sm-2 control-label">
              หมายเหตุ :
            </label>
            <div class="col-sm-10">
              <textarea
                name="txtNote"
                id="txtNote"
                cols="30"
                rows="3"
                class="form-control"
              ></textarea>
            </div>
          </div>

          <div class="form-group row">
            <label class="col-sm-2 control-label"></label>
            <div class="col-sm-10">
              <p class="m-t bg-muted p-sm">
                ผู้แปล คุณพจนารถ เอมศิรานันท์ โดยได้ส่งเอกสารมายัง
                j_jea@rihes.org CC: ariya@rihes.org และ venus@rihes.org{" "}
              </p>
            </div>
          </div>
          <div class="mail-body text-right tooltip-demo">
            <button
              id="submitform1"
              type="button"
              class="btn  btn-primary"
              data-toggle="tooltip"
              data-placement="top"
              title="บันทึก"
            >
              <i class="fa fa-save"></i> บันทึก
            </button>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { Tabs, Tab, Modal, Button } from "react-bootstrap";
import { MDBDataTable } from "mdbreact";
import AddNew from "./AddNew";
import { observer, inject } from "mobx-react";
import axios from "axios";
import moment from "moment";
import Edit from "./Edit";
import logo from "./assets/success.gif";
import "./index.css";

require("moment/locale/th.js");

function AddNewModal(props) {
  return (
    <Modal {...props} size="xl">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          เพิ่มแบบฟอร์ม
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddNew />
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

function EditModal(props) {
  return (
    <Modal {...props} size="xl">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          รายละเอียดแบบฟอร์ม
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Edit />
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

function SuccessModal(props) {
  return (
    <Modal {...props} size="sm">
      <Modal.Body title>
        <div className="success" id="textTitle">
          <img src={logo} className="photo" alt=""></img>
          <h5 class="text-center">{props.title}</h5>
        </div>
      </Modal.Body>
    </Modal>
  );
}

const RenderTabs = observer((props) => {
  moment.locale("th");
  const [dataRes, setData] = useState([]);
  const [dataStatus, setDataStatus] = useState([]); // eslint-disable-line
  let [statusId] = useState([]); // eslint-disable-line
  const [level] = useState([]); // eslint-disable-line
  const [statusRequest, storeStatusRequest] = useState(2);
  const [modalAddNewShow, setAddNewModalShow] = useState(false);
  const [modalEditShow, setEditModalShow] = useState(false);
  const [key, setKey] = useState("approved");
  const [successModal, setsuccessModal] = useState(false);
  // const [access_token] = useState(
  //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MGRmMjQ1YS1hNjFlLTQ2M2QtOGFkNC02OWE5ZGJjODkzNTIiLCJqdGkiOiJhOGJiOTYwNjYyN2I1M2RmMWU2OGUyYjdhMGY5NmNiMzEzOGMxODY5ZjI1MzdhODlhNjYxZWVhOGMzMDRlNDZjMDRmMDBhMGRmNDJlMWRjZSIsImlhdCI6MTYyMjE3NjExOSwibmJmIjoxNjIyMTc2MTE5LCJleHAiOjE2NTM3MTIxMTksInN1YiI6IjUxNiIsInNjb3BlcyI6W119.U0X7o1hnzBGs38DdE55_ant_pvrrKmv5IjBvJmMyRYPG4LEOR6C_UtbmYzPPcSmXODrrZHvndo3_PaR7KJ-o8ZwYe2KlV5VTtW7hhuEHJvHfkG0k6y7AUocRKDoQI65v5-_0XABVhCejR4RhYCd5Hl-zORcx29w97w3Ry7ThOoHDmm286YiCgDB3pkhkuXNlT_P3x7BPqVwP80yK8TdcnSqL6wPwtSJLPNvX34m7e5GYVgk9X1Y0HG-gzAer7h-eqBMnEJJkphmV3W-eSwyra8S5gFD_czO3xVbgBxoYJNiVqRM2ubDyzj6ykmhA0_H0lLS2WGGZZEnpSGafA70ELXNU3hXoefxqLaupR2juBNrW2HLx4Y6lGC9SNHmll-G4DxkPmGrNFrdzN2noOe8jYlX3fUu9hKeHe8G4Q2cybvJajrfKcpEjvch0Iw3WdB9E5Lv6CZqlVdWHHThHEXPgWDzL5mydgb7TVQz4gQGpwsm4Y57w4s-3FclLxJdaOZnyJTAV_FA2GVWPPDZkYfd_dY8FMehpa_YuN2iQCy-JxpyaANMJorTUS_pnD0Mv65ZWRNZEHTZMGZs9-hfRkIs5ElcTwN7vDVd1WKiuicvhw_ab7aCM_MvxDO2lwWRY-ybPn2TRyZYIMP7S2-ZT7uBoIrS3qNoxsWMSTjzxMDonVyk"
  // );
  const [access_token] = useState(
    localStorage.getItem('access_token')
  );

  useEffect(() => {
    props.GetListAllStore.storeAccessToken(access_token);
    if (props.AddNewStore.isClose) {
      setsuccessModal(true);
    }
    handleCloseAddnew();
    handleCloseEdit();
    getUser();
    getListAll(statusRequest); // eslint-disable-line
  }, [props.AddNewStore.isClose]); // eslint-disable-line

  const getUser = () => {
    axios
      .get("/api/v1/auth/user", {
        headers: {
          Authorization: "Bearer " + access_token,
          // props.GetListAllStore.access_token,
        },
      })
      .then(function (response) {
        const data = response.data.translate;
        console.log(data);
        for (i = 0; i < data.length; i++) {
          level.push(data[i].level);
        }
        props.GetListAllStore.storeLevel(level);
      })
      .catch(function (error) {
        console.log(error);
        window.location.href = "https://e-work.rihes.cmu.ac.th/";
      })
      .then(function () {});
  };

  const getListAll = async (status_id) => {
    await axios
      .get("/api/translate/v1/all/status_id/" + status_id, {
        headers: {
          Authorization: "Bearer " + access_token,
        },
      })
      .then(function (response) {
        if (response.status === 200) {
          const data = response.data;
          console.log(data);
          setData(data);
        } else {
          alert(response.statusText);
        }
      })
      .catch(function (error) {
        console.log(error);
        window.location.href = "https://e-work.rihes.cmu.ac.th/";
      })
      .then(function () {
        // always executed
      });
  };

  const handleCloseSuccess = () => {
    setTimeout(function () {
      setsuccessModal(false);
    }, 1500);
  };

  const handleCloseAddnew = () => {
    props.AddNewStore.clearClose();
    setAddNewModalShow(false);
  };

  const handleCloseEdit = () => {
    props.AddNewStore.clearClose();
    setEditModalShow(false);
  };

  const handleRowClick = (e) => {
    var m = moment(e.doneAt, "DD MMMM YYYY", "th");
    if (props.GetListAllStore.onClick) {
      props.GetListAllStore.storeData(
        e.name,
        e.empDep,
        e.projName,
        e.useInProject,
        e.thaiToEng,
        e.engToThai,
        e.composeEng,
        m.locale("en").format("YYYY/MM/DD"),
        e.note,
        e.createdAt,
        e.id,
        e.attachments,
        e.translator,
        e.translator_attachments
      );
      setEditModalShow(true);
    }
  };

  const setEvent = (k) => {
    switch (k) {
      case "approved":
        setKey(k);
        getListAll(2);
        storeStatusRequest(2);
        props.GetListAllStore.storeStatusRequest(2);
        break;
      case "accept":
        setKey(k);
        getListAll(3);
        storeStatusRequest(3);
        props.GetListAllStore.storeStatusRequest(3);
        break;
      case "complete":
        setKey(k);
        getListAll(4);
        storeStatusRequest(4);
        props.GetListAllStore.storeStatusRequest(4);
        break;
      case "reject":
        setKey(k);
        getListAll(5);
        storeStatusRequest(5);
        props.GetListAllStore.storeStatusRequest(5);
        break;
      default:
        break;
    }
  };

  const renderTab = () => {
    return (
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setEvent(k)}
      >
        <Tab eventKey="approved" title="อนุมัติ">
          {Tables()}
        </Tab>
        <Tab eventKey="accept" title="รับงาน">
          {Tables()}
        </Tab>
        <Tab eventKey="complete" title="ส่งงานแปล">
          {Tables()}
        </Tab>
        <Tab eventKey="reject" title="ปฏิเสธ">
          {Tables()}
        </Tab>
      </Tabs>
    );
  };

  var j;
  for (j = 0; j < dataStatus.length; j++) {
    statusId.push(dataStatus[j].id);
  }

  var rows = [];
  var i;
  for (i = 0; i < dataRes.length; i++) {
    rows.push({
      id: dataRes[i].id,
      useInProject: dataRes[i].project_name,
      projName: dataRes[i].name,
      price: [<div className="rowTable">{"-"} </div>],
      doneAt: moment(new Date(dataRes[i].done_at)).format("LL"),
      acknowledgeHead: [<div className="rowTable">{"-"}</div>],
      acknowledgeStaff: [<div className="rowTable">{"-"}</div>],
      status: [
        <div className="rowTable">
          {dataRes[i].status_id.map(({ name }) => name)}
        </div>,
      ],
      editFollowUp: [
        <div className="rowTable">
          <Button
            variant="info"
            size="sm"
            id="edit-btn"
            onMouseOver={() => props.GetListAllStore.storeOnClick(true)}
            onMouseOut={() => props.GetListAllStore.storeOnClick(false)}
          >
            <i class="fa fa-eye mr-1"></i> รายละเอียดแบบฟอร์ม
          </Button>
        </div>,
      ],
      clickEvent: (e) => handleRowClick(e),
      createdAt: moment(dataRes[i].created_at).format("LL"),
      thaiToEng: dataRes[i].thai_to_eng_page,
      engToThai: dataRes[i].eng_to_thai_page,
      composeEng: dataRes[i].compose_doc_page,
      note: dataRes[i].note,
      name: dataRes[i].emp_name,
      empDep: dataRes[i].emp_dep,
      attachments: dataRes[i].attachments,
      translator_attachments: dataRes[i].translator_attachments,
      translator: dataRes[i].translator.map(({ name }) => name),
      headName: [
        <div className="rowTableHead">
          <p>{dataRes[i].head_name ? dataRes[i].head_name : "-"}</p>
          <p className="subRow" style={{ fontSize: 12 }}>
            {dataRes[i].head_updated_at
              ? moment(dataRes[i].head_updated_at).format("LL")
              : ""}
          </p>
          <p className="subRow" style={{ fontSize: 12 }}>
            {dataRes[i].head_updated_at
              ? "เวลา: " +
                moment(dataRes[i].head_updated_at).format("LT") +
                " น."
              : ""}
          </p>
        </div>,
      ],
      translatorName: [
        <div className="rowTableTranslator">
          {statusRequest !== 2 && (
            <p>
              {dataRes[i].translator_name ? dataRes[i].translator_name : "-"}
            </p>
          )}
          {statusRequest !== 2 && (
            <p className="subRow" style={{ fontSize: 12 }}>
              {dataRes[i].translator_updated_at
                ? moment(dataRes[i].translator_updated_at).format("LL")
                : ""}
            </p>
          )}
          {statusRequest !== 2 && (
            <p className="subRow" style={{ fontSize: 12 }}>
              {dataRes[i].head_updated_at
                ? "เวลา: " +
                  moment(dataRes[i].translator_updated_at).format("LT") +
                  " น."
                : ""}
            </p>
          )}
          {statusRequest === 2 && <p>-</p>}
        </div>,
      ],
      // headUpdated: dataRes[i].head_updated_at
    });
  }

  const labelHead = (lb) => {
    return (
      <div className="titleTable">
        <b>{lb}</b>
        {/* <i key="Lorem" className="fa fa-sort ml-2" aria-hidden="true"></i> */}
      </div>
    );
  };

  const Tables = () => {
    let data;
    if (statusRequest !== 5) {
      data = {
        columns: [
          {
            label: [labelHead("ชื่อเอกสาร")],
            field: "projName",
            sort: "asc",
            width: 150,
          },
          {
            label: [labelHead("ใช้ในงาน / โครงการ")],
            field: "useInProject",
            sort: "asc",
            width: 150,
          },
          {
            label: [labelHead("ค่าใช้จ่าย")],
            field: "price",
            sort: "asc",
            width: 150,
          },
          {
            label: [labelHead("วันที่ต้องรับเอกสาร")],
            field: "doneAt",
            sort: "asc",
            width: 150,
          },
          {
            label: [labelHead("หัวหน้ารับทราบ")],
            field: "headName",
            sort: "asc",
            width: 150,
          },
          {
            label: [labelHead("เจ้าหน้าที่รับทราบ")],
            field: "translatorName",
            sort: "asc",
            width: 150,
          },
          {
            label: [labelHead("สถานะ")],
            field: "status",
            sort: "asc",
            width: 150,
          },
          {
            label: [labelHead("แก้ไข / ติดตาม")],
            field: "editFollowUp",
            sort: "asc",
            width: 150,
          },
          {
            label: [labelHead("วันที่บันทึก")],
            field: "createdAt",
            sort: "asc",
            width: 100,
          },
        ],
        rows,
      };
    } else {
      data = {
        columns: [
          {
            label: [labelHead("ชื่อเอกสาร")],
            field: "projName",
            sort: "asc",
            width: 150,
          },
          {
            label: [labelHead("ใช้ในงาน / โครงการ")],
            field: "useInProject",
            sort: "asc",
            width: 150,
          },
          {
            label: [labelHead("ค่าใช้จ่าย")],
            field: "price",
            sort: "asc",
            width: 150,
          },
          {
            label: [labelHead("วันที่ต้องรับเอกสาร")],
            field: "doneAt",
            sort: "asc",
            width: 150,
          },
          {
            label: [labelHead("หัวหน้ารับทราบ")],
            field: "headName",
            sort: "asc",
            width: 150,
          },
          {
            label: [labelHead("เจ้าหน้าที่รับทราบ")],
            field: "translatorName",
            sort: "asc",
            width: 150,
          },
          {
            label: [labelHead("สถานะ")],
            field: "status",
            sort: "asc",
            width: 150,
          },
          {
            label: [labelHead("วันที่บันทึก")],
            field: "createdAt",
            sort: "asc",
            width: 100,
          },
        ],
        rows,
      };
    }

    return (
      <MDBDataTable
        responsive
        btn
        striped
        bordered
        data={data}
        paginationLabel={["ก่อนหน้า", "ต่อไป"]}
        noRecordsFoundLabel={"ไม่พบรายการที่ค้นหา"}
        infoLabel={["แสดงรายการค้นหา", "ถึง", "จาก ทั้งหมด", "รายการ"]}
        displayEntries={false}
        noBottomColumns
        entries={20}
      />
    );
  };

  return (
    <div class="m-3">
      <div class="m-3">
        <AddNewModal
          show={modalAddNewShow}
          onHide={() => setAddNewModalShow(false)}
        />
        {modalEditShow && (
          <EditModal show={true} onHide={() => setEditModalShow(false)} />
        )}
        <SuccessModal
          show={successModal}
          onHide={handleCloseSuccess(false)}
          dialogClassName="success"
          aria-labelledby="example-custom-modal-styling-title"
          title={props.GetListAllStore.successTitle}
        />
        {renderTab()}
      </div>
    </div>
  );
});

export default inject("AddNewStore", "GetListAllStore")(RenderTabs);

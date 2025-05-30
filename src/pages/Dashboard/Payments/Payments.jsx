import React, { useEffect, useState } from "react";
import Table from "@components/Table/Table";
import { Col, Row, DropdownButton, Dropdown } from "react-bootstrap";
import Modal from "@components/Modal/Modal";
import ProductForm from "@components/Listings/ProductForm/ProductForm";
import ConfirmationBox from "@components/ConfirmationBox/ConfirmationBox";
import { Helmet } from "react-helmet";
import axiosWrapper from "@utils/api";
import toast from "react-hot-toast";
import TextExpand from "@components/TextExpand/TextExpand";
import DateRenderer from "@components/DateFormatter/DateFormatter";
import eyeIcon from "@icons/basil_eye-solid.svg";
import { paymentsDummyData } from "../../../data/data";
import downArrow from "@icons/down-arrow.svg";
import "../../../styles/Common.scss";
import "../../../styles/Payments.scss";

const Payments = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const [studentModal, setStudentModal] = useState({
    show: false,
    title: "",
    isEditable: false,
    studentId: null,
  });
  const [loading, setLoading] = useState(false);
  const [loadingCRUD, setLoadingCRUD] = useState(false);

  const [paymentsData, setPaymentsData] = useState(null);

  const [selectedOption, setSelectedOption] = useState("All");

  useEffect(() => {
    // Fetch data from API here
    fetchData();
  }, []);

  const fetchData = async () => {
    // Later we will replace this with actual API call
    try {
      setLoading(true);

      setPaymentsData(paymentsDummyData);
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (event) => {
    // Handle row click event here
    if (selectedRowId === event.data.id) {
      setSelectedRowId(null);
      return;
    }
    setSelectedRowId(event.data.id);
  };

  const handleEditClick = (studentId) => {
    // Handle edit action here
    setStudentModal({
      show: true,
      title: "Edit Product",
      isEditable: true,
      studentId: studentId,
    });
  };

  const handleDeleteClick = (id) => {
    // Handle delete action here
    setSelectedRowId(id);
    setShowDeleteModal(true);
  };
  const handleViewClick = () => {
    // Later we implement stripe payment here
    toast.success("Will Be Redirected to Stripe Payment Page later.");
  };

  const handleCloseModal = () => {
    resetProductModal();
  };

  const resetProductModal = () => {
    setStudentModal({
      show: false,
      title: "",
      isEditable: false,
      studentId: null,
    });
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteSubmit = async () => {
    try {
      setLoadingCRUD(true);
      const data = await axiosWrapper(
        "delete",
        `${import.meta.env.VITE_JSONPLACEHOLDER}/posts/${selectedRowId}}`
      );
      toast.success(data?.message || "Item deleted successfully");
    } catch (error) {
      return;
    } finally {
      setLoadingCRUD(false);
      setShowDeleteModal(false);
    }
  };

  const handleEventSelect = (eventKey, coach) => {
    setSelectedOption(coach);
  };
  const toggleExpand = (event) => {
    // Specifically in this component, we need to prevent the event from propagating to the parent element
    event.stopPropagation();
    setExpanded(!expanded);
  };

  /*eslint-disable */
  const ActionsRenderer = (props) => (
    <React.Fragment>
      <Row style={{ width: "100%" }}>
        <Col
          lg={6}
          md={6}
          sm={6}
          className="d-flex justify-content-center align-items-center"
        >
          <div
            className="btn-light action-button delete-button"
            onClick={() => props.onViewClick()}
          >
            <img src={eyeIcon} className="action-icon ms-3" alt="action-icon" />
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
  const NameRenderer = (props) => (
    <div key={props.data.id}>
      <div className="d-flex align-items-center gap-2">
        <img
          src={props.data.avatarUrl}
          alt={props.data.name}
          className="avatar"
        />
        <div
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: expanded ? "normal" : "nowrap",
            cursor: "pointer",
          }}
          onClick={toggleExpand}
        >
          {props.value}
        </div>
      </div>
    </div>
  );
  /*eslint-disable */

  const columns = [
    {
      headerName: "Student Name",
      field: "studentName",
      filter: "agSetColumnFilter",
      sortable: true,
      unSortIcon: true,
      wrapText: true,
      autoHeight: true,
      cellRenderer: NameRenderer,
      resizable: false,
    },
    {
      headerName: "Email",
      field: "email",
      filter: "agSetColumnFilter",
      sortable: true,
      unSortIcon: true,
      wrapText: true,
      autoHeight: true,
      cellRenderer: TextExpand,
      resizable: false,
    },
    {
      headerName: "Payment ID",
      field: "paymentId",
      filter: "agSetColumnFilter",
      sortable: true,
      unSortIcon: true,
      resizable: false,
      cellRenderer: ({ data: rowData }) => {
        const paymentId = rowData.paymentId;
        return <div key={rowData.id}>{paymentId}</div>;
      },
    },
    {
      headerName: "Amount Paid ($)",
      field: "amountPaid",
      filter: "agSetColumnFilter",
      sortable: true,
      unSortIcon: true,
      resizable: false,
      cellRenderer: ({ data: rowData }) => {
        const amountPaid = rowData.amountPaid;
        return <div key={rowData.id}>{amountPaid}</div>;
      },
    },
    {
      headerName: "Date & Time",
      field: "dateTime",
      filter: "agSetColumnFilter",
      sortable: true,
      unSortIcon: true,
      cellRenderer: DateRenderer,
      wrapText: true,
      autoHeight: true,
      resizable: false,
    },
    {
      headerName: "Actions",
      maxWidth: 100,
      cellRenderer: ActionsRenderer,
      cellRendererParams: {
        onEditClick: handleEditClick,
        onDeleteClick: handleDeleteClick,
        onViewClick: handleViewClick,
      },
      pinned: "right",
      sortable: false,
      filter: false,
      resizable: false,
      cellClass: ["d-flex", "align-items-center", "justify-content-center"],
    },
  ];

  return (
    <div className="payments-page">
      <Helmet>
        <title>Payments | Account Academy</title>
      </Helmet>
      {studentModal.show && (
        <Modal
          size="large"
          show={studentModal.show}
          onClose={handleCloseModal}
          title={studentModal.title}
        >
          <ProductForm
            productModal={studentModal}
            resetModal={resetProductModal}
          />
        </Modal>
      )}
      {showDeleteModal && (
        <ConfirmationBox
          show={showDeleteModal}
          onClose={handleCloseDeleteModal}
          loading={loadingCRUD}
          title="Delete Entry"
          body="Are you sure you want to delete this entry?"
          onConfirm={handleDeleteSubmit}
        />
      )}
      <Table
        columns={columns}
        tableData={paymentsData}
        onRowClicked={handleRowClick}
        loading={loading}
        children={
          <div className="payments-button-wrapper">
            <DropdownButton
              title={
                <div className="d-flex justify-content-between align-items-center gap-2">
                  <span>{selectedOption}</span>
                  <img className="ms-3" src={downArrow} alt="Down arrow" />
                </div>
              }
              defaultValue={selectedOption}
              className="dropdown-button"
            >
              {["Paid", "Overdue", "HT", "LT"].map((events) => (
                <Dropdown.Item
                  onClick={(e) => handleEventSelect(e, events)}
                  key={events}
                  eventKey={events}
                  className="my-1 ms-2"
                >
                  <span className="payment-name"> {events}</span>
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </div>
        }
      />
    </div>
  );
};

export default Payments;

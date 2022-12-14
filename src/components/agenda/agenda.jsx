// @flow
import React, { Component } from "react";
import moment from "moment";
import "./agenda.scss";
import Notification from "../Notification";
import {
  ReactAgenda,
  ReactAgendaCtrl,
  // guid,
  // getUnique,
  // getLast,
  // getFirst,
  Modal,
} from "react-agenda";
import items from "../Helpers/data";

var now = new Date();

require("moment/locale/en-in.js");
var colors = {
  "color-1": "rgba(204, 229, 225 , 1)",
  "color-2": "rgba(153, 255, 153, 1)",
  "color-3": "rgba(255, 204, 153, 1)",
  "color-4": "rgba(70, 159, 213, 1)",
  "color-5": "rgba(170, 59, 123, 1)",
};

export default class Agenda extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      selected: [],
      cellHeight: 60 / 4,
      showModal: false,
      locale: "EN",
      rowsPerHour: 4,
      numberOfDays: 4,
      startDate: new Date(),
    };
    this.handleRangeSelection = this.handleRangeSelection.bind(this);
    this.handleItemEdit = this.handleItemEdit.bind(this);

    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this.addNewEvent = this.addNewEvent.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
    this.editEvent = this.editEvent.bind(this);
    this.changeView = this.changeView.bind(this);
    this.handleCellSelection = this.handleCellSelection.bind(this);
  }

  componentDidMount() {
    this.setState({ items: items });
  }

  componentWillReceiveProps(next, last) {
    if (next.items) {
      this.setState({ items: next.items });
    }
  }
  handleItemEdit(item, openModal) {
    if (item && openModal === true) {
      this.setState({ selected: [item] });
      return this._openModal();
    }
  }
  handleCellSelection(item, openModal) {
    if (this.state.selected && this.state.selected[0] === item) {
      return this._openModal();
    }
    this.setState({ selected: [item] });
  }

  zoomIn() {
    var num = this.state.cellHeight + 15;
    this.setState({ cellHeight: num });
  }
  zoomOut() {
    var num = this.state.cellHeight - 15;
    this.setState({ cellHeight: num });
  }

  handleDateRangeChange(startDate, endDate) {
    this.setState({ startDate: startDate });
  }

  handleRangeSelection(selected) {
    this.setState({ selected: selected, showCtrl: true });
    this._openModal();
  }

  _openModal() {
    this.setState({ showModal: true });
  }
  _closeModal(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.setState({ showModal: false });
  }

  handleItemChange(items, item) {
    this.setState({ items: items });
  }

  handleItemSize(items, item) {
    this.setState({ items: items });
  }

  removeEvent(items, item) {
    this.setState({ items: items });
    if (this.removeEvent.successfully) {
      Notification({
        title: "Success",
        message: "Event deleted successfully",
      });
    } else {
      Notification("Event not deleted", "Error");
    }
  }
  // Create appointment

  addNewEvent(items, newItems) {
    this.setState({ showModal: false, selected: [], items: items });
    this._closeModal();
  }
  // Edit appointment
  editEvent(items, item) {
    this.setState({ showModal: false, selected: [], items: items });
    this._closeModal();
  }

  changeView(days, event) {
    this.setState({ numberOfDays: days });
  }

  // AgendaItem = function (props) {
  //   console.log(" item component props", props);
  //   return (
  //     <div
  //     // style={{ display: "block", position: "absolute", background: "#FFF" }}
  //     >
  //       {props.item.name} <button>D </button>
  //     </div>
  //   );
  // };

  render() {
    return (
      <div className="content-expanded ">
        <div className="control-buttons">
          <button className="button-control" onClick={this._openModal}>
            {" "}
            <button className="">Add event</button>{" "}
          </button>
          <button
            className="button-control"
            onClick={this.changeView.bind(null, 7)}
          >
            {" "}
            {moment.duration(7, "days").humanize()}{" "}
          </button>
          <button
            className="button-control"
            onClick={this.changeView.bind(null, 4)}
          >
            {" "}
            {moment.duration(4, "days").humanize()}{" "}
          </button>
          <button
            className="button-control"
            onClick={this.changeView.bind(null, 3)}
          >
            {" "}
            {moment.duration(3, "days").humanize()}{" "}
          </button>
          <button
            className="button-control"
            onClick={this.changeView.bind(null, 1)}
          >
            {" "}
            {moment.duration(1, "day").humanize()}{" "}
          </button>
        </div>

        <ReactAgenda
          minDate={new Date(now.getFullYear(), now.getMonth() - 3)}
          maxDate={new Date(now.getFullYear(), now.getMonth() + 3)}
          startDate={this.state.startDate}
          startAtTime={8}
          endAtTime={23}
          cellHeight={this.state.cellHeight}
          locale="EN"
          items={this.state.items}
          numberOfDays={this.state.numberOfDays}
          headFormat={"ddd DD MMM"}
          rowsPerHour={this.state.rowsPerHour}
          itemColors={colors}
          helper={true}
          // itemComponent={AgendaItem}
          view="calendar"
          autoScale={false}
          fixedHeader={true}
          onRangeSelection={this.handleRangeSelection.bind(this)}
          onChangeEvent={this.handleItemChange.bind(this)}
          onChangeDuration={this.handleItemSize.bind(this)}
          onItemEdit={this.handleItemEdit.bind(this)}
          onCellSelect={this.handleCellSelection.bind(this)}
          onItemRemove={this.removeEvent.bind(this)}
          onDateRangeChange={this.handleDateRangeChange.bind(this)}
          // onDownload={this.handleDownload.bind(this)}
        />

        {this.state.showModal ? (
          <Modal clickOutside={this._closeModal}>
            <div className="modal-content">
              <ReactAgendaCtrl
                items={this.state.items}
                itemColors={colors}
                selectedCells={this.state.selected}
                Addnew={this.addNewEvent}
                edit={this.editEvent}
                // add check if not empty
              />
            </div>
            <button className="control-buttons" onClick={this._openModal}>
              {" "}
              <button className="button-control">Download</button>{" "}
            </button>
          </Modal>
        ) : (
          ""
        )}
      </div>
    );
  }
}

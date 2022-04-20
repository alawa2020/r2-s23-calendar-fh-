import React, { FormEvent } from "react";

import Modal from "react-modal";
import DateTimePicker from 'react-datetime-picker';
import moment from "moment";

import { customStyles } from "../../utils";

import "./modalCalendar.css";
import { Event } from "../../interfaces";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../state/reducers";
import { doCloseModal } from "../../state/actions";


// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const initialForm: Event = {
  _id: '',
  title: '',
  notes: '',
  start: moment().minutes(0).seconds(0).add(1, 'hours').toDate(),
  end: moment().minutes(0).seconds(0).add(2, 'hours').toDate(),
}

export const ModalCalendar = () => {
  // hooks
  const { formValues, setFormValues, handleInputChange } = useForm( initialForm );
  const { title, notes, start, end } = formValues;

  const { isModalOpen } = useSelector( (state: State) => state.ui );
  const dispatch = useDispatch();
  // functions
  const closeModal = () => {
    dispatch( doCloseModal() );
  };

  const handleStartDateChange = ( e: Date ) => {
    setFormValues({
      ...formValues,
      start: e,
    })
  }
  const handleEndDateChange = ( e: Date ) => {
    setFormValues({
      ...formValues,
      end: e,
    })
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log( formValues );
  }

  return (
    <>
      <Modal
        isOpen={ isModalOpen }
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
      >
        <h1> Nuevo evento </h1>
        <hr />
        <form 
          className="container"
          onSubmit={ handleFormSubmit }
        >
          <div className="form-group">
            <label>Fecha y hora inicio</label>
            <DateTimePicker 
              onChange={ handleStartDateChange } 
              value={ start } 
              className="form-control"
              // format="y-MM-dd h:mm:ss a"
              format="dd/MM/y h:mm a"
              maxDate={ end }
            />
          </div>

          <div className="form-group">
            <label>Fecha y hora fin</label>
            <DateTimePicker 
              onChange={ handleEndDateChange } 
              value={ end } 
              className="form-control"
              // format="y-MM-dd h:mm:ss a"
              format="dd/MM/y h:mm a"
              minDate={ start }
            />
          </div>

          <hr />
          <div className="form-group">
            <label>Titulo y notas</label>
            <input
              type="text"
              className="form-control"
              placeholder="Título del evento"
              autoComplete="off"
              name="title"
              value={ title }
              onChange={ handleInputChange }

            />
            <small id="emailHelp" className="form-text text-muted">
              Una descripción corta
            </small>
          </div>

          <div className="form-group">
            <textarea
              className="form-control"
              placeholder="Notas"
              rows={5}
              name="notes"
              value={ notes }
              onChange={ handleInputChange }
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Información adicional
            </small>
          </div>

          <button type="submit" className="btn btn-outline-primary btn-block">
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    </>
  );
};
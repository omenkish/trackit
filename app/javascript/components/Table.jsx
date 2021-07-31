import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import TimeInput from './TimeInput';
import { minsToTimeStr } from "../utils/timeUtil";
import usePrevious from "../utils/hooks/usePrevious";

const entryLabelKeyMaps = {
  clock_in: 'Clocked in',
  clock_out: 'Clocked out'
};

const Table = ({ data = [], updateClock, isLoading, title }) => {

  const [editableEntry, setEditableEntry] = useState(null);

  const onEditableInputChange = value => {

    if (!isNaN(value)) {
      const timeString = minsToTimeStr(value);
      const [hours, minutes] = timeString.split(":");
      const time = moment(editableEntry?.time)
        .hours(parseInt(hours))
        .minutes(parseInt(minutes))
        .toISOString();
        console.log("time ", time);
      setEditableEntry(entry => ({ ...entry, time }));
    }
  };

  const previousEditableEntry = usePrevious(editableEntry);

  const onSave = async () => {
    const url = `/api/v1/entries/${editableEntry.id}`;
    console.log("previousEditableEntry ", previousEditableEntry);
    console.log("editableEntry ", editableEntry);

    if (previousEditableEntry && previousEditableEntry.time !== editableEntry.time) {
      await updateClock(url, { entry: { time: editableEntry.time } }, () => setEditableEntry(null));
    }
  };

  return <>
   {title ? <h5 className="mb-1">{title}</h5> : null}
  <table className="table table-striped entries-table">
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Date</th>
        <th scope="col">Event</th>
        <th scope="col">Time</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      {data?.length > 0 ? data.map((entry, index) => {
        const isCurrentEntryEditable = editableEntry?.id === entry.id;
        return <tr key={entry.id}>
          <th scope="row">{index + 1}</th>
          <td>
            <Moment date={entry.time} format="Do	MMM, YYYY" />
          </td>
          <td>{entryLabelKeyMaps[entry.entry_type]}</td>
          <td>
            {isCurrentEntryEditable ?
              <TimeInput default={moment(new Date(entry.time)).format("hh:mm a")}
                changeNotify={onEditableInputChange} /> :
              <Moment date={entry.time} format="hh:mm a" />}
          </td>
          <td>
            {isCurrentEntryEditable ? <>
              <button type="button" 
                      disabled={isLoading} 
                      onClick={onSave} 
                      className="btn btn-outline-info btn-sm me-1">
                        {isLoading ? 'Updating...' : 'Save'}
                      </button>
              <button type="button" disabled={isLoading} onClick={() => setEditableEntry(null)} className="btn btn-danger btn-sm">Cancel</button>
            </> :
              <button type="button" onClick={() => setEditableEntry(entry)} className="btn btn-outline-info btn-sm">Edit</button>
            }
          </td>
        </tr>
      }) : null}
    </tbody>
  </table></>
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateClock: PropTypes.func.isRequired,
};

export default Table;

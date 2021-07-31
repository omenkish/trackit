import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { first, groupBy } from "lodash";
import moment from "moment";
import Table from './Table';
import { genericRequest, getRequest } from '../utils/apiRequests';

const entryLabelKeyMaps = {
  clock_in: 'Clock in',
  clock_out: 'Clock out'
};

const entryValueKeyMaps = {
  clock_in: 'clock_in',
  clock_out: 'clock_out'
};

const updateData = (data, current) => {
  const index = current.findIndex(x => x.id === data.id);
    return [
      ...current.slice(0, index),
      data,
      ...current.slice(index + 1),
    ];
};

const Entries = () => {
  const history = useHistory();
  const [entries, setEntries] = useState([]);
  const [isLoadingEntries, setIsLoadingEntries] = useState(false);
  const [submitting, setSubmitting ] = useState(false);
  const [nextEntry, setNextEntry] = useState(entryValueKeyMaps.clock_in);

  useEffect(() => {
    if (entries.length) {
      const lastEntry = first(entries);
      const isLastClockedIn = lastEntry?.entry_type === entryValueKeyMaps.clock_in;
      if(isLastClockedIn) {
        setNextEntry(entryValueKeyMaps.clock_out);
      } else {
        setNextEntry(entryValueKeyMaps.clock_in);
      }

    }
  }, [entries]);

  useEffect(
    () => {

      const user = localStorage.getItem('user');
      if (!user) {
        history.push('/');
        return;
      }
      setIsLoadingEntries(true);

      getRequest('/api/v1/entries')
        .then(response => {
          return setEntries(response.data);
        })
        .catch((error) => console.log('object', error))
        .finally(() => setIsLoadingEntries(false));
    },[]);


  const clockInOrClockOut = async () => {
    const url = '/api/v1/entries';
    const data = {
      entry: {
        entry_type: nextEntry,
        time: new Date()
      },
    };

    setSubmitting(true);
    try {
      const response = await genericRequest(url, data, 'POST');

      setEntries(current => [response.data, ...current]);
    } catch(error) {
      
    } finally {
      setSubmitting(false);
    };
    
  }

  const updateClock = async (url, data, onSuccessCallback) => {
    try {
      const response = await genericRequest(url, data, 'PUT');

      const newData = updateData(response.data, entries);
      setEntries(newData);
      !!onSuccessCallback && onSuccessCallback();
    } catch (error){
    }
  };

  const logout = async () => {
    const url = '/logout';

    try {
      await genericRequest(url, null, 'DELETE');
      localStorage.clear();
      history.push('/');
    } catch(error) {
      
    } 
  };

  const entriesByDate = groupBy(entries, item => moment(new Date(item.time)).format('DD-MMM-YYYY'));

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand">&nbsp; &nbsp; TrackIt!</a>
        <span>
          <button onClick={logout} className="btn btn-outline-success my-2 my-sm-0" >Logout </button>
          &nbsp; &nbsp;
        </span>
      </nav>


      <div className="py-5">
        <main className="container">
          {isLoadingEntries ? null : <div className="text-right mb-5">
            <button className="btn btn-large custom-button" 
              disabled={submitting}
              onClick={clockInOrClockOut}>
              {submitting ? 'Loading...' : entryLabelKeyMaps[nextEntry]}
            </button>
          </div>}
          <div>
          {Object.entries(entriesByDate).map(([date, entries]) => <Table key={date} title={date} data={entries} 
          updateClock={updateClock} isLoading={submitting} />)}
          
          </div>
        </main>
      </div>
    </>
  );
};

export default Entries;

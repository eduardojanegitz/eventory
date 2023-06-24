import React from 'react';
import Popup from 'reactjs-popup';

export const PopupExample = () => (
  <Popup
    trigger={<button className="btn-submit"> Cadastrar </button>}
    modal
    nested
  >
    {close => (
      <div className="modal">
        <button className="close" onClick={close}>
          &times;
        </button>
        {/* <div className="header"> Modal Title </div> */}
        <div className="content">
          {' '}
           Cadastrado com sucesso!
        </div>
        <div className="actions">
          <Popup
            // trigger={}
            position="top center"
            nested
          >
          
          </Popup>
          {/* <a onClick={() => window.location.reload(true)}> <MdRestartAlt className='restart' /> </a> */}
        </div>
      </div>
    )}
  </Popup>
);
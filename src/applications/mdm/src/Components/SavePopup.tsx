import { Modal } from 'bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSaveMode } from '../Store/reducers/report';
import { downloadAsFile } from '../util';
import { ApiService } from '../Service/ApiService';
import { MDMRootState, mdmStoreDispatch, mdmStoreSelector } from '../Store';
import {useTranslation} from 'react-i18next';

// pop up with backdrop bootstrap5 with file name to save as
export function SavePopup() {
  const {t, i18n} = useTranslation();
  document.body.dir = i18n.dir();
  const dispatch = mdmStoreDispatch();
  const state = mdmStoreSelector((state: MDMRootState) => state.report.report);
  const saveMode = mdmStoreSelector(
    (state: MDMRootState) => state.report.saveMode
  );

  const [fileName, setFileName] = useState('MDM_' + new Date().toDateString());

  useEffect(() => {
    if (!saveMode) return;

    const modalElement = document.getElementById('savePopup');
    const modalInstance = new Modal(modalElement, {});
    modalInstance.show();

    // on modalInstance hidden
    modalElement.addEventListener('hidden.bs.modal', function (event) {
      dispatch(setSaveMode(false));
    });
  }, [saveMode, dispatch]);

  const save = () => {
    // if (fileName === "") return;
    // downloadAsFile(state, fileName);
    ApiService.saveReport(state, fileName)
      .then((res) => {
        console.log(res);

        const modalElement = document.getElementById('savePopup');
        const modalInstance = new Modal(modalElement, {});
        modalInstance.hide();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div
        className="modal"
        id="savePopup"
        style={{ zIndex: 1051 }}
        aria-labelledby="savePopupLabel"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ backgroundColor: '#F2F2F2' }}
            >
              <h5 className="modal-title" id="savePopupLabel">
                {t("Save As")}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                style={{ backgroundColor: '#F2F2F2' }}
              ></button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  {t("File Name")}
                </span>
                <input
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="MDM"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div>
            </div>
            <div
              className="modal-footer"
              style={{ backgroundColor: '#F2F2F2' }}
            >
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                {t("Cancel")}
              </button>
              <button
                onClick={() => save()}
                type="button"
                className="btn btn-primary"
              >
                {t("Save")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

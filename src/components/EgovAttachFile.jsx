import React from 'react';
import { useNavigate } from 'react-router-dom';

import URL from 'constants/url';
import * as EgovNet from 'api/egovFetch';
import { SERVER_URL } from 'config';
import CODE from 'constants/code';

function EgovAttachFile({ boardFiles, mode, fnChangeFile, fnDeleteFile }) {
    console.groupCollapsed("EgovAttachFile");

    const navigate = useNavigate();

    function onClickDownFile(atchFileId, fileSn) {
        window.open(SERVER_URL + "/cmm/fms/FileDown.do?atchFileId=" + atchFileId + "&fileSn=" + fileSn + "");
    }

    function onClickDeleteFile(atchFileId, fileSn, fileIndex) {
        console.log("onClickDeleteFile Params : ", atchFileId, fileSn, fileIndex);

        const jToken = localStorage.getItem('jToken');
        
        const requestOptions = {
            method: "DELETE",
            headers: {
                'Authorization': jToken
            },
            body: {
                "atchFileId" : atchFileId,
                "fileSn" : fileSn
            }
        }
        EgovNet.requestFetch(`/cmm/fms/deleteFileInfsAPI/${atchFileId}/${fileSn}.do`,
            requestOptions,
            function (resp) {
                console.log("===>>> board file delete= " , resp);
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    // 성공
                    console.log("Deleted fileIndex = " , fileIndex);
                    // eslint-disable-next-line no-unused-vars
                    const _deleteFile = boardFiles.splice(fileIndex, 1);
                    const _boardFiles = Object.assign([], boardFiles);
                    fnDeleteFile(_boardFiles);
                    alert("첨부파일이 삭제되었습니다.");
                    fnChangeFile({});
                } else {
                    navigate({pathname: URL.ERROR}, {state: {msg : resp.message}});
                }
            }
        );
    }

    function onChangeFileInput(e) {
        console.log("===>>> e = " + e.target.files[0]);
        fnChangeFile(e.target.files[0]);
    }

    let filesTag = [];

    if (boardFiles !== undefined) {
        boardFiles.forEach(function (item, index) {      
            filesTag.push(
                <React.Fragment key={index}>
                    <span>
                        <a  href={"#LINK"} onClick={function (e) {
                            e.preventDefault();
                            onClickDownFile(item.atchFileId, item.fileSn);
                        }} download>
                            {item.orignlFileNm}
                        </a>
                        <span>
                            [{item.fileMg}byte]
                        </span>
                    </span>
                </React.Fragment>
            );

            if (mode === CODE.MODE_MODIFY) {
                filesTag.push(
                    <React.Fragment key={["button", `${index}`].join(" ")}>
                        <button className="btn btn_delete" onClick={(e) => {
                            onClickDeleteFile(item.atchFileId, item.fileSn, index);
                        }}></button>
                    </React.Fragment>
                );
            }
            filesTag.push(<br key={["br", `${index}`].join(" ")}/>);
        });
    }
    console.log("filesTag : ", filesTag);
    console.groupEnd("EgovAttachFile");
    
    return (
        <dl>
            <dt>첨부파일</dt>
            <dd>
                <span className="file_attach">
                    {filesTag}
                    {(mode === CODE.MODE_MODIFY || mode === CODE.MODE_CREATE) && <input name="file_0" id="egovComFileUploader" type="file" onChange={e => onChangeFileInput(e)}></input>}
                </span>
            </dd>
        </dl>
    );
}

export default React.memo(EgovAttachFile);
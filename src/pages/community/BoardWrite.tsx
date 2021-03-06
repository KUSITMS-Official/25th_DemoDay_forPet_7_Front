import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { Colors } from '../../styles/ui';
import { BoardHeader } from '../../components/community';
import { useNavigate } from 'react-router-dom';
import { setHeader } from "../../api";
import { Header } from "../../components";



const BoardWrite = () => {
    const [radio, setRadio] = useState<string>();
    const [contents, setContents] = useState<Contents>({
        title: '',
        content: '',
        category: '',
    });
    const navigate = useNavigate();

    interface Contents {
        title: string,
        content: string,
        category: string,
    }

    if(localStorage.getItem("token") != ""){
        const ACCESS_TOKEN = localStorage.getItem("token");
        setHeader(ACCESS_TOKEN);
    }

    const handleRadioButton = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.value);
        setRadio(e.target.value);
        setContents({...contents, category: e.target.value});
    }

    const [file, setFile] = useState<File>();

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.files![0]);
        setFile(e.target.files![0]);
    }

    const fileSubmitHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const end_url = '/community';
        const formData = new FormData();
        formData.append('community_request',
            new Blob([JSON.stringify(contents)], { type: "application/json" })
        );
        formData.append('imageList', file!);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        await axios.post(
            process.env.REACT_APP_BACK_BASE_URL + end_url,
            formData,
            config
        )
            .then(({ status, data }) => {
                // console.log(status, data);
                if (status === 200 || status === 201) {
                    navigate('/all');
                }
            })
            .catch((e) => {
                console.log(e);
            })
    }


    return (
        <>
        <Header />
        <BoardHeader />
        <Wrapper>
            <Upper>
            <Radios>
                <label>
                    <input
                        type='radio'
                        value='meeting'
                        checked={radio === 'meeting'}
                        onChange={(e) => handleRadioButton(e)}
                    />??????
                </label>
                <label>
                    <input
                        type='radio'
                        value='sharing'
                        checked={radio === 'sharing'}
                        onChange={(e) => handleRadioButton(e)}
                    />??????
                </label>
                <label>
                    <input
                        type='radio'
                        value='boasting'
                        checked={radio === 'boasting'}
                        onChange={(e) => handleRadioButton(e)}
                    />??????
                </label>
            </Radios>
            </Upper>
            <hr
                style={{
                    color: `${Colors.gray1}`,
                    height: 1,
                    width: '100%'
                }}
            />
            <textarea
                rows={1}
                placeholder='??????'
                onChange={(
                    e: React.ChangeEvent<HTMLTextAreaElement>,
                ): void => setContents({ ...contents, title: e.target.value })}
                value={contents.title}
            ></textarea>
            <hr
                style={{
                    color: `${Colors.gray1}`,
                    height: '1px',
                    width: '100%'
                }}
            />
            <textarea
                rows={20}
                placeholder='????????? ????????? ??????????????? ?????? ???????????? ????????? ??????????????? &#13;&#13;
                ????????? ?????? ????????? ???????????????.
                - ?????? ??? ????????? ?????? ??????
                - ????????? ????????? ??????????????? ???????????? ?????? ??????
                - ??????, ?????? ?????? ??? ????????? ???????????? ??????
                - ??????, ??????, ??????, ??????, ?????? ?????? ????????? ????????? ????????? ?????? ??????'
                onChange={(
                    e: React.ChangeEvent<HTMLTextAreaElement>,
                ): void => setContents({ ...contents, content: e.target.value })}
                value={contents.content}
            >
            </textarea>
            <div className='low-section'>
                <input type="file" multiple onChange={(e) => onFileChange(e)} />
            </div>
            
        </Wrapper>
        <Buttons>
            <button onClick={ () => {
                navigate(-1);
            }}
            style={{backgroundColor: '#CBD2CA', color: '#676767', fontSize: '20px'}}>??????</button>
            <button 
            onClick={(e) => fileSubmitHandler(e)}
            style={{backgroundColor: '#B9CDB4', color: '#64805E', fontSize: '20px'}}>??????</button>
        </Buttons>
        </>
    )
}

export default BoardWrite;

const Upper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Wrapper = styled.div`
    background-color: ${Colors.white};
    margin: 20px 80px;
    padding: 10px;
    box-shadow: 0px 4px 33px rgba(0, 0, 0, 0.1);
    border-radius: 15px;

    textarea {
        width: 100%;
        resize: none;
        border: none;
        font-size: 16px;
    }

    .low-section {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
`

const Radios = styled.div`
    display: flex;
    flex-direction: row;
    margin-right: auto;
`

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 80px 30px 80px;

    button {
        width: 49%;
        height: 50px;
        box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.25);
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }
`
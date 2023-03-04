import React from 'react'
import styled from 'styled-components'
import { CloseBtn, EditGrad, DeleteGrad } from '../assets/ImageUrl'


export default function Popup({ heading, body, close, className, isHeader, isDelete, ishr, actionBtns, clrHeading }) {
    return (
        <PopupStyle className={className && className}>
            <div className="modalBlack"></div>
            <div className="popupBox">
                {!isHeader &&
                    <div className="headerPop">
                        <h4 className={!clrHeading ? "fd6" : "fg1"}>{heading}</h4>
                        {ishr &&
                            <hr className="cus-hr"></hr>
                        }
                        <div className="close" onClick={() => close && close()}>
                            {isDelete &&
                                <>
                                    <img src={EditGrad} className="mr-2" alt="edit icon" />
                                    <img src={DeleteGrad} className="mr-2" alt="delete icon" />
                                </>
                            }
                            <img src={CloseBtn} alt="close icon" />
                        </div>

                    </div>
                }
                <div className="body cus_scroll">
                    {body}
                </div>
            </div>
        </PopupStyle>
    )
}

const PopupStyle = styled.div`
    position: fixed;
    height: 100vh;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 9999;
    &.px500 {
        .popupBox {
            width: 500px;
            text-align: center;
            h2 {
                margin-bottom: 16px;
                line-height: 32px;
            }
            button:not(.rdrCalendarWrapper button) {
                width: 160px;
                font-size: 20px;
            }
        }
    }
    &.dateRangePicker {
        .popupBox {
            width: 680px;
            .body {
                padding: 0;
            }
        }
    }
    &.px800 {
        .popupBox {
            width: 100%;
            max-width: 800px;
            .body {
                padding: 0;
            }
        }
    }
    &.px1200 {
        .popupBox {
            width: 100%;
            max-width: 1100px;
            .body {
                padding: 0;
            }
        }
    }
    &.px588 {
        .popupBox {
            width: 588px;
            .body {
                padding: 24px 0 0;
            }
        }
    }
    &.px428 {
        .popupBox {
            width: 428px;
            .body {
                padding: 24px 0 0;
            }
        }
    }
    &.px860 {
        .popupBox {
            width: 460px;
            .body {
                padding: 20px 0px;
                padding-right: 10px;
            }
        }
    }
    &.cus-loggedIn{
        .popupBox {
            width: 700px;
            text-align: center;
            padding: 10px 0px;
            h2 {
                line-height: 32px;
            }
            button {
                width: 25%;
                height: 45px;
                font-size: 16px;
                margin-top: 16px;
                margin-bottom: 10px;

                &:hover{
                    background: white;
                    color:black;
                    border: 1px solid black;
                }
            }
        }
    }
    .modalBlack {
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.8);;
        opacity: 0;
        animation: opacityElement 0.2s linear;
        animation-fill-mode: forwards;
    }
    .popupBox {
        background: #ffffff;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -20%);
        animation: bringUp 0.2s ease-in 0.1s;
        animation-fill-mode: forwards;
        padding: 16px 24px;
        border-radius: 10px;
        .headerPop {
            text-align: center;
            position: relative;
            h4 {
                padding-bottom: 12px;
                // border-bottom: 1px solid rgba(0, 0, 0, 0.05);
                border-bottom: 1px solid rgba(0, 0, 0, 0.05);
            }

            .cus-hr{
                opacity:0.3;
                margin-bottom:15px;
            }
            .close {
                position: absolute;
                top: 0;
                right: 0;
                cursor: pointer;
            }
            .mr-2{
                margin-right: 15px;
            }
            .li{
                width:4px;
                height:4px;
                background:red;
            }
        }
        .body {
            padding: 24px 24px 0 24px;
            max-height: calc(100vh - 150px);
            overflow: auto;
            &::-webkit-scrollbar{
                width: 5px
            }
            &::-webkit-scrollbar-track {
                box-shadow: inset 0 0 5px grey; 
                border-radius: 5px;
              }
            &::-webkit-scrollbar-thumb {
                background: linear-gradient(0deg,rgba(0,0,0,0.2),rgba(0,0,0,0.2)),linear-gradient(269.82deg,#38A1F7 0.1%,#38568F 99.85%); 
                border-radius: 5px;
              }
            &::-webkit-scrollbar-thumb:hover {
                background: #b30000; 
              }
        }
    }
    @keyframes opacityElement {
        100% {
            opacity: 1;
        }
    }
    @keyframes bringUp {
        100% {
            transform: translate(-50%, -50%);
        }
    }
`

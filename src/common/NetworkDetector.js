import React, { Component } from 'react';
import toastService from './toastServices';
import { withTranslation } from "react-i18next";
import { internetStatusEncrypt } from '../helper/Encypt';
import { IconToastInfo } from '../assets/images';
import store from '../store';
import { appOnlineStatusAction } from '../store/action/awsActions';

const toastId = 'networkToast';

class NetworkDetector extends Component {
    constructor() {
        super();
        this.state = {
            netWorkStatus: "online"
        };
    }

    componentDidMount() {
        window.addEventListener('online', this.handleConnectionChange);
        window.addEventListener('offline', this.handleConnectionChange);
    }

    componentWillUnmount() {
        window.removeEventListener('online', this.handleConnectionChange);
        window.removeEventListener('offline', this.handleConnectionChange);
    }

    /**
      Help to find Internet is Connected or Not
    */
      handleConnectionChange = () => {
        const { t } = this.props;
        const condition = navigator.onLine ? 'online' : 'offline';
        console.log("networkdetector",navigator.onLine )
        if (condition === 'online') {
            this.setState({ netWorkStatus: "online" });
            toastService.dismissToast(toastId);
            internetStatusEncrypt(true);//internet status true setInto session,
            setTimeout(() => {
                toastService.successToast(
                    <div className="customToast">
                        <i className="info"><IconToastInfo /></i>
                        <p>{t('NETWORK.CONN_SUCCESS')}</p>
                    </div>, toastId);
            }, 1000);
            store.dispatch(appOnlineStatusAction(true));
        } else {
            this.setState({ netWorkStatus: "offline" });
            internetStatusEncrypt(false);//internet status false setInto session,
            toastService.networkToast(
                <div className="customToast errorToast networkToast">
                    <i className="info"><IconToastInfo />
                    </i><p>{t('NETWORK.CONN_FAILURE')}</p>
                </div>, toastId);
                store.dispatch(appOnlineStatusAction(false));
        }
    }

    render() {
        return null;
    }
}

export default withTranslation()(NetworkDetector);

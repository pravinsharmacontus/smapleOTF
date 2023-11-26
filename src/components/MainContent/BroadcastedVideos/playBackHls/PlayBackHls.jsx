import React, { useEffect } from "react";

const PlayBackHls = (props) => {
    const { playbackUrl = "", getSelectedThumb = "", livePlayer = false } = props;

    console.log("PlayBackHls", props);
    useEffect(() => {
        plyrPlyaer(playbackUrl);
        return(() => {
            plyrPlyaer('');
        });
    }, []);

    const liveControls = [
        'play-large', // The large play button in the center
        'restart', // Restart playback
        'play', // Play/pause playback
        'seasons',
        'mute', // Toggle mute
        'volume', // Volume control
        'captions', // Toggle captions
        'fullscreen', // Toggle fullscreen
        'heart',
    ];

    const staticControls = [
        'play-large', // The large play button in the center
        'restart', // Restart playback
        'rewind', // Rewind by the seek time (default 10 seconds)
        'play', // Play/pause playback
        'fast-forward', // Fast forward by the seek time (default 10 seconds)
        'progress', // The progress bar and scrubber for playback and buffering
        'seasons',
        'mute', // Toggle mute
        'volume', // Volume control
        'captions', // Toggle captions
        'fullscreen', // Toggle fullscreen
        'heart',
        'duration',
        'current-time' // The current time of playback
    ];
    function plyrPlyaer(source) {
        const Plyr = window?.Plyr;
        let not_found = false;
        const selector = '#player';
        const player = new Plyr(selector, {
            max_resolution: 720,
            debug: true,
            autoplay: true,
            title: '',
            invertTime: true,
            hls: {
                enabled: true,
                src: source,
            },
            storage: { enabled: true, key: 'gudsho-check' },
            ads: {
                enabled: false,
                tagUrl: 'https://gudsho-newsaas-qa.s3.amazonaws.com/gudsho-ads/VASUKI/pvt-tom-and-jerrysubs-1/1684934099801-advertisement.xml'
            },
            keyboard: {
                global: true,
            },
            controls: livePlayer ? liveControls : staticControls,
            settings: ['quality', 'captions'],
            tooltips: {
                controls: true,
            },
            captions: {
                active: true,
                update: true,
            },
            liveDetails: {
                enabled: livePlayer,
                connected: livePlayer,
            },
        });
        player.setNextEpisodes = true;
        player.setNextPromo = true;
        player.on('next-episodes', event => {
            console.log('next-episodes', event.detail.plyr.nextEpisodes);
        });
        player.on('help', event => {
            console.log('help', event.detail.plyr.helpPopup);
        });
        player.on('seasons', event => {
            console.log('seasons', event.detail.plyr.seasonsPopup);
        });
        player.on('next-promo', event => {
            console.log('next-promosss', event.detail.plyr.nextPromo);
        });
        player.on('restart', event => {
            console.log('restart', event);
        });
        player.on('adsimpression', event => {
            const plyrAds = document.querySelector('.plyr__ads');
            plyrAds.classList.add('is-ads-player-show');
            console.log('adsimpression:::', event);
        });
        player.on('adscomplete', event => {
            const plyrAds = document.querySelector('.plyr__ads');
            plyrAds.classList.remove('is-ads-player-show');
            console.log('adscomplete:::', event);
        });

        player.on('404', event => {
            console.log(event);
            not_found = true;
            onStreamStopped();

        });
        player.on('timeupdate', event => {
            onStreamStopped();
        });

        function onStreamStopped() {
            if (not_found && player.loading) {
                player.stop();
                const plyrLoading = document.querySelector('.plyr--loading');
                plyrLoading.classList.remove('plyr--loading');
                if (player.fullscreen) {
                    player.fullscreen.exit();
                }

            }
        }
    }
    return (
        <video poster={getSelectedThumb} className="allrites-player" data-id="89188" id="player" controls></video>
    );
};

export default PlayBackHls;

/**
 * Extends app functionality
 */

console.log("Scripts::Running script select_default_account.js");

function SelectDefaultAccountAddon() {
    this.TAG = 'SelectDefaultAccountAddon';

    this.run = function() {
        var $this = this;

        EventUtils.onLoad(function() {
            if (YouTubeUtils.playerIsOpened() ||
                YouTubeUtils.searchIsOpened() ||
                YouTubeUtils.channelIsOpened()) { // dialog not shown yet, because the video is running
                var handler = function() {
                    $this.selectDefaultAccount();
                    EventUtils.removeListener(YouTubeSelectors.SURFACE_AREA, YouTubeEvents.MODEL_CHANGED_EVENT, handler);
                };

                EventUtils.addListener(YouTubeSelectors.SURFACE_AREA, YouTubeEvents.MODEL_CHANGED_EVENT, handler);
            } else {
                $this.selectDefaultAccount();
            }
        });
    };

    this.selectDefaultAccount = function() {
        Log.d(this.TAG, "Hiding multi-account panel");

        this.hidePanelContainer();

        var $this = this;
        setTimeout(function() { // panel pop-ups with delay
            $this.closePanel();
            $this.showPanelContainer();
        }, 3000);
    };

    /**
     * May contain other useful elements like exit dialog
     */
    this.hidePanelContainer = function() {
        Utils.hide(YouTubeSelectors.OVERLAY_PANEL_CONTAINER);
    };

    /**
     * May contain other useful elements like exit dialog
     */
    this.showPanelContainer = function() {
        Utils.show(YouTubeSelectors.OVERLAY_PANEL_CONTAINER);
    };

    this.closePanel = function() {
        var dialog = Utils.$(YouTubeSelectors.OVERLAY_PANEL);

        if (dialog) {
            Log.d(this.TAG, "closing account panel...");
            EventUtils.triggerEvent(
                dialog,
                DefaultEvents.KEY_UP,
                DefaultKeys.ESC);
        }
    };
}

new SelectDefaultAccountAddon().run();
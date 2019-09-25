package com.liskovsoft.smartyoutubetv.misc.appstatewatcher.handlers;

import android.content.Context;
import com.liskovsoft.sharedutils.mylogger.Log;
import com.liskovsoft.smartyoutubetv.misc.CacheManager;
import com.liskovsoft.smartyoutubetv.misc.appstatewatcher.AppStateWatcherBase.StateHandler;

public class CacheCleanHandler extends StateHandler {
    private static final String TAG = CacheCleanHandler.class.getSimpleName();
    private final Context mContext;
    private final CacheManager mManager;

    public CacheCleanHandler(Context context) {
        mContext = context;
        mManager = new CacheManager(context);
    }

    @Override
    public void onUpdate() {
        Log.d(TAG, "App has been updated. Removing cache files...");

        mManager.clearCache();
    }

    @Override
    public void onFirstRun() {
        Log.d(TAG, "App might be upgraded from older version. Removing cache files...");

        mManager.clearCache();
    }
}

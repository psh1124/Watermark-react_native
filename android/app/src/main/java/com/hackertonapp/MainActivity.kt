package com.hackertonapp

import android.os.Bundle
import org.devio.rn.splashscreen.SplashScreen
import com.facebook.react.ReactActivity

class MainActivity : ReactActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        SplashScreen.show(this) // SplashScreen 표시
        super.onCreate(savedInstanceState)
    }

    override fun getMainComponentName(): String {
        return "InvisibleWatermarkApp" // 앱 이름
    }
}

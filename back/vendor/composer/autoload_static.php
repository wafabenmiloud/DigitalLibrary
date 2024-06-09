<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInita8542dfde6f29521dec171d9bbf08852
{
    public static $prefixLengthsPsr4 = array (
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
        'D' => 
        array (
            'Dell\\DigitalLibrary\\' => 20,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
        'Dell\\DigitalLibrary\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInita8542dfde6f29521dec171d9bbf08852::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInita8542dfde6f29521dec171d9bbf08852::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInita8542dfde6f29521dec171d9bbf08852::$classMap;

        }, null, ClassLoader::class);
    }
}
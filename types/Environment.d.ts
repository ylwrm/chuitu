declare namespace Environment {
    interface Setting {
        /**
         * e.g. "https://www.baidu.com"
         */
        origin: string;

        /**
         * e.g. "www.baidu.com"
         */
        hostname: string;

        /**
         * e.g. "4433"
         */
        port: string;
    }
}

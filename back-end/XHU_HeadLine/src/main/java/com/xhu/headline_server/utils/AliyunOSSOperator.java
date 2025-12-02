package com.xhu.headline_server.utils;

import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.io.ByteArrayInputStream;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Component
public class AliyunOSSOperator {

    private final AliyunOSSProperties props;

    public AliyunOSSOperator(AliyunOSSProperties props) {
        this.props = props;
    }

    public String upload(byte[] content, String originalFilename) {
        String endpoint = props.getEndpoint();
        String bucketName = props.getBucketName();
        String accessKeyId = props.getAccessKeyId();
        String accessKeySecret = props.getAccessKeySecret();

        if (!StringUtils.hasText(endpoint)) {
            throw new IllegalStateException("aliyun.oss.endpoint is not configured");
        }
        if (!StringUtils.hasText(bucketName)) {
            throw new IllegalStateException("aliyun.oss.bucket-name is not configured");
        }
        if (!StringUtils.hasText(accessKeyId) || !StringUtils.hasText(accessKeySecret)) {
            throw new IllegalStateException("aliyun.oss.access-key-id/access-key-secret is not configured");
        }

        String dir = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM"));
        String ext = (originalFilename != null && originalFilename.lastIndexOf('.') >= 0)
                ? originalFilename.substring(originalFilename.lastIndexOf('.')) : "";
        String objectName = dir + "/" + UUID.randomUUID() + ext;

        // endpoint 必须为纯域名；SDK允许带协议，这里统一去掉协议以便拼最终 URL
        String normalizedEndpoint = endpoint.replaceFirst("^https?://", "");

        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);
        try {
            ossClient.putObject(bucketName, objectName, new ByteArrayInputStream(content));
        } finally {
            ossClient.shutdown();
        }
        return "https://" + bucketName + "." + normalizedEndpoint + "/" + objectName;
    }
}

resource "aws_acm_certificate" "razormath_cert" {
  domain_name       = "razormath.com"
  validation_method = "DNS"

  subject_alternative_names = ["www.razormath.com"]
}

resource "aws_route53_record" "razormath_cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.razormath_cert.domain_validation_options : dvo.domain_name => {
      name  = dvo.resource_record_name
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  }

  zone_id = var.route53_zone_id
  name    = each.value.name
  type    = each.value.type
  ttl     = 60
  records = [each.value.value]
}

resource "aws_acm_certificate_validation" "razormath_cert_validation" {
  certificate_arn         = aws_acm_certificate.razormath_cert.arn
  validation_record_fqdns = [for record in aws_route53_record.razormath_cert_validation : record.fqdn]
}

resource "aws_cloudfront_distribution" "static_website" {
  origin {
    domain_name = "${aws_s3_bucket.static_website.bucket_regional_domain_name}"
    origin_id   = "S3-razormath-static-website"

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access.iam_arn
    }
  }

  enabled             = true
  default_root_object = "index.html"

  default_cache_behavior {
    target_origin_id = "S3-razormath-static-website"

    viewer_protocol_policy = "redirect-to-https"
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]

    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.razormath_cert.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}

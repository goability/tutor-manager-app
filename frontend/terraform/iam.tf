resource "aws_iam_role" "cloudfront_access" {
  name = "CloudFrontAccessRole"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

resource "aws_iam_policy" "cloudfront_s3_policy" {
  name   = "CloudFrontS3AccessPolicy"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["s3:GetObject"]
        Resource = "${aws_s3_bucket.static_website.arn}/*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "attach_cloudfront_policy" {
  role       = aws_iam_role.cloudfront_access.name
  policy_arn = aws_iam_policy.cloudfront_s3_policy.arn
}

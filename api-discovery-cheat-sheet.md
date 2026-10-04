# API Discovery Cheat Sheet

## Semrush Hidden API Endpoints

### Main Endpoint
```
https://api.semrush.com/?type={report_type}&key={your_api_key}&target={domain}
```

### Undocumented Export Columns
These columns are often available but not listed in official documentation:

- `DomainAuthority` - Third-party domain authority score
- `TrustRank` - Trust flow metric
- `LinkType` - Type of backlink (dofollow/nofollow)
- `SourceDomainAuthority` - Authority of linking domain
- `BacklinkType` - Classification of backlink type
- `LinkStatus` - Status of backlink (active/inactive)

### Example Enhanced Request
```
curl "https://api.semrush.com/?type=backlinks&key=YOUR_API_KEY&target=example.com&export_columns=Url,Anchor,Source,DomainAuthority,TrustRank,LinkType"
```

## Ahrefs Hidden API Endpoints

### Main Endpoint
```
https://api.ahrefs.com/v3/{module}/{endpoint}?key={your_api_key}&target={domain}
```

### Undocumented Parameters
- `include_subdomains=true` - Include subdomain data
- `exclude_internal=true` - Exclude internal links
- `filter_by_keyword={keyword}` - Filter results by keyword
- `metrics=extended` - Return extended metrics

### Example Enhanced Request
```
curl "https://api.ahrefs.com/v3/site-explorer/overview?key=YOUR_API_KEY&target=example.com&include_subdomains=true&exclude_internal=true&metrics=extended"
```

## Moz Hidden API Endpoints

### Main Endpoint
```
https://lsapi.seomoz.com/v2/url_metrics?Cols={bitfield}&url={domain}
```

### Undocumented Bitfield Values
Additional bitfield values that unlock extra metrics:
- `68719476736` - Adds MozRank and additional link metrics
- `137438953472` - Adds Spam Score data
- `274877906944` - Adds Domain Authority history

### Example Enhanced Request
```
curl "https://lsapi.seomoz.com/v2/url_metrics?Cols=68719476736&url=example.com&access_id=YOUR_ACCESS_ID&secret_key=YOUR_SECRET_KEY"
```

## DataForSEO Hidden API Endpoints

### Main Endpoint
```
https://api.dataforseo.com/v3/serp/google/organic/live/advanced
```

### Undocumented Parameters
- `calculate_rectangles=true` - Calculate ad placement rectangles
- `browser_preset=firefox120` - Use specific browser preset
- `page_render=true` - Render full page content
- `accept_language=en-US` - Set specific language headers

### Example Enhanced Request
```
curl -X POST "https://api.dataforseo.com/v3/serp/google/organic/live/advanced" \
  -H "Authorization: Basic YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"keyword":"example keyword","calculate_rectangles":true,"browser_preset":"firefox120"}'
```

## 2Captcha Hidden API Endpoints

### Main Endpoint
```
https://2captcha.com/in.php?key={your_api_key}&method={solver_method}
```

### Undocumented Parameters
- `soft_id={id}` - Use specific solver algorithm
- `pingback={url}` - Callback URL for completed solves
- `proxy={proxy_string}` - Use specific proxy for solving
- `proxytype={type}` - Specify proxy type (HTTP, HTTPS, SOCKS)

### Example Enhanced Request
```
curl "https://2captcha.com/in.php?key=YOUR_API_KEY&method=userrecaptcha&soft_id=12345&pingback=https://yourdomain.com/callback&googlekey=SITE_KEY&pageurl=https://example.com"
```

## Apify Hidden API Endpoints

### Main Endpoint
```
https://api.apify.com/v2/actors/{actorId}/runs?token={your_token}
```

### Undocumented Input Fields
- `proxyConfiguration` - Custom proxy settings
- `maxConcurrency` - Maximum concurrent requests
- `sessionPoolOptions` - Session management options
- `customData` - Custom data passed to actor

### Example Enhanced Request
```
curl -X POST "https://api.apify.com/v2/actors/actorId/runs?token=YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "proxyConfiguration": {
      "useApifyProxy": true,
      "apifyProxyGroups": ["RESIDENTIAL"]
    },
    "maxConcurrency": 50,
    "customData": {"source": "enhanced_scraper"}
  }'
```

## Google PageSpeed Hidden API Endpoints

### Main Endpoint
```
https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={url}&key={your_api_key}
```

### Undocumented Categories
Additional audit categories that can be included:
- `pwa` - Progressive Web App audits
- `best-practices` - Web development best practices
- `accessibility` - Accessibility audits

### Example Enhanced Request
```
curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://example.com&category=performance&category=seo&category=pwa&category=best-practices&key=YOUR_API_KEY"
```

## Best Practices for Using Hidden APIs

1. **Always test thoroughly** - Hidden endpoints may change without notice
2. **Monitor for breaking changes** - Implement alerting for failed requests
3. **Document everything** - Keep records of discovered endpoints and parameters
4. **Respect rate limits** - Hidden endpoints often have stricter rate limiting
5. **Use official authentication** - Never try to bypass legitimate auth mechanisms
6. **Stay compliant** - Ensure usage aligns with terms of service

## Integration Tips

1. **Create wrapper functions** - Abstract away the complexity of hidden endpoints
2. **Implement fallbacks** - Use documented endpoints as backups when hidden ones fail
3. **Cache aggressively** - Many metrics don't change frequently, so cache results
4. **Log extensively** - Track which hidden endpoints provide the most value
5. **Version your discoveries** - Hidden endpoints may disappear, so version your findings

This cheat sheet provides a starting point for discovering and utilizing hidden API endpoints. Always verify that your usage complies with the terms of service of each platform.
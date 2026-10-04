# Hidden API Discovery Playbook for SEO Tools

## Methodology Overview

The most effective way to discover hidden or undocumented APIs is through browser network inspection. This involves monitoring all HTTP requests made by a web application to identify endpoints that aren't publicly documented but still accessible.

## Step-by-Step Process

### 1. Browser Network Inspection
1. Open the target tool's web interface (e.g., Semrush, Ahrefs, Moz dashboard)
2. Press F12 to open Developer Tools
3. Navigate to the "Network" tab
4. Perform actions in the UI that you want to automate
5. Look for XHR/Fetch requests in the network log
6. Examine request URLs, headers, and parameters
7. Identify patterns and undocumented query parameters

### 2. Request Replication
1. Copy the full request URL including all query parameters
2. Replace authentication tokens with your own API key
3. Test with curl or your preferred HTTP client
4. Document any additional headers or parameters

### 3. Parameter Discovery
1. Look for hidden form fields or query parameters in the UI
2. Check JavaScript source code for hardcoded values
3. Examine response payloads for additional data fields
4. Test with modified parameters to unlock extra functionality

## Tool-Specific Hidden API Opportunities

### Semrush
- **Undocumented Parameters**: Many endpoints accept additional `export_columns` values not listed in documentation
- **Hidden Metrics**: Additional columns like `SourceDomainAuthority`, `BacklinkType`, `LinkStatus` 
- **Endpoint**: `https://api.semrush.com/?type=backlinks&target=example.com&export_columns=Url,Anchor,Source,DomainAuthority`

### Ahrefs
- **Undocumented Endpoints**: Some v3 endpoints not listed in public docs
- **Hidden Parameters**: Additional query params like `include_subdomains`, `exclude_internal`, `filter_by_keyword`
- **Endpoint**: `https://api.ahrefs.com/v3/site-explorer/overview?target=example.com&mode=subdomains`

### Moz
- **Extra Columns**: Additional `Cols` bitfield values for extra metrics
- **Hidden Endpoints**: Some endpoints support additional data types not in docs
- **Endpoint**: `https://lsapi.seomoz.com/v2/url_metrics?Cols=68719476736&url=example.com`

### DataForSEO
- **Hidden Fields**: Additional response fields in JSON payloads
- **Undocumented Parameters**: Extra query parameters for enhanced results
- **Endpoint**: `https://api.dataforseo.com/v3/serp/google/organic/live/advanced`

### 2Captcha
- **Hidden Parameters**: Additional solver parameters like `soft_id`, `pingback`
- **Endpoint**: `https://2captcha.com/in.php?key=YOURKEY&method=userrecaptcha&soft_id=12345&pingback=https://myhook.com/solved`

### Apify
- **Hidden Input Fields**: Undocumented actor input schema fields
- **Endpoint**: `https://api.apify.com/v2/actors/{actorId}/runs?token=YOURTOKEN` with additional JSON payload fields

### Google PageSpeed
- **Additional Categories**: Extra audit categories not shown in UI
- **Endpoint**: `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://example.com&category=performance&category=seo&category=pwa`

## Practical Implementation Examples

### Example 1: Enhanced Semrush Backlink Analysis
```bash
# Standard documented call
curl "https://api.semrush.com/?type=backlinks&key=YOURKEY&target=example.com&export_columns=Url,Anchor,Source"

# Enhanced call with hidden columns
curl "https://api.semrush.com/?type=backlinks&key=YOURKEY&target=example.com&export_columns=Url,Anchor,Source,DomainAuthority,TrustRank,LinkType"
```

### Example 2: Extended Ahrefs Competitor Analysis
```bash
# Standard call
curl "https://api.ahrefs.com/v3/site-explorer/overview?key=YOURKEY&target=example.com"

# Enhanced call with hidden parameters
curl "https://api.ahrefs.com/v3/site-explorer/overview?key=YOURKEY&target=example.com&include_subdomains=true&exclude_internal=true"
```

### Example 3: Rich PageSpeed Insights
```bash
# Standard call
curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://example.com&key=YOURKEY"

# Enhanced call with additional categories
curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://example.com&category=performance&category=seo&category=pwa&category=best-practices&key=YOURKEY"
```

## Best Practices

### Security & Ethics
- Only use endpoints that belong to your own account
- Respect rate limits and terms of service
- Never attempt to access competitor data without permission
- Use official API keys and authentication methods

### Rate Limiting
- Implement exponential backoff for failed requests
- Cache results when possible to reduce API calls
- Use queue systems for bulk processing
- Monitor usage quotas to avoid service interruption

### Documentation
- Create a "cheat sheet" of discovered endpoints and parameters
- Document authentication requirements for each endpoint
- Record sample responses to understand data structures
- Track which parameters are required vs optional

## Integration with Money Robot

### Workflow Enhancement
1. **Site Auditing**: Use PageSpeed API to audit competitor sites
2. **Keyword Research**: Leverage enhanced Semrush/Ahrefs endpoints for deeper insights
3. **Backlink Analysis**: Use enriched backlink data for content creation
4. **Captcha Solving**: Implement advanced 2Captcha parameters for faster solves
5. **Scraping**: Use Apify with hidden parameters for stealthy data collection

### Implementation Steps
1. Create a script that discovers hidden endpoints for each tool
2. Document the findings in a centralized knowledge base
3. Build wrapper functions that handle authentication and parameter substitution
4. Integrate with Money Robot's custom command feature
5. Schedule regular updates to keep data fresh

## Conclusion

Discovering hidden APIs is a powerful technique for gaining competitive advantages in SEO and automation. By carefully monitoring network traffic and experimenting with undocumented parameters, you can unlock additional functionality that isn't publicly advertised. Always ensure your usage remains ethical and compliant with terms of service, and remember to document your findings for future reference.
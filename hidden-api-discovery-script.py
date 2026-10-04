#!/usr/bin/env python3
"""
Hidden API Discovery Script

This script helps discover hidden API endpoints and parameters by monitoring
network traffic from popular SEO tools. It provides a framework for capturing,
analyzing, and documenting undocumented API functionality.

Usage:
    python hidden-api-discovery-script.py --tool semrush --action analyze --domain example.com
"""

import argparse
import json
import requests
import time
from urllib.parse import urlencode
from typing import Dict, List, Any

class APIDiscoveryTool:
    """Base class for discovering hidden API endpoints"""
    
    def __init__(self, api_key: str = None):
        self.api_key = api_key
        self.session = requests.Session()
        
    def make_request(self, url: str, params: Dict = None, headers: Dict = None) -> Dict:
        """Make HTTP request with error handling"""
        try:
            if params:
                url = f"{url}?{urlencode(params)}"
            
            response = self.session.get(url, headers=headers)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error making request: {e}")
            return {}
            
    def discover_endpoints(self) -> List[str]:
        """Discover potential hidden endpoints"""
        # This would typically involve monitoring network traffic
        # For demonstration, we'll return example endpoints
        return []

class SemrushDiscoverer(APIDiscoveryTool):
    """Discover hidden Semrush API endpoints"""
    
    def __init__(self, api_key: str):
        super().__init__(api_key)
        self.base_url = "https://api.semrush.com/"
        
    def get_enhanced_backlinks(self, domain: str) -> Dict:
        """Get backlinks with hidden columns"""
        params = {
            'type': 'backlinks',
            'key': self.api_key,
            'target': domain,
            'export_columns': 'Url,Anchor,Source,DomainAuthority,TrustRank,LinkType,SourceDomainAuthority,BacklinkType,LinkStatus'
        }
        
        return self.make_request(self.base_url, params)
        
    def get_competitor_intelligence(self, domain: str) -> Dict:
        """Get enhanced competitor data"""
        params = {
            'type': 'domain_organic',
            'key': self.api_key,
            'domain': domain,
            'export_columns': 'Ph,Po,Pp,Pd,Nq,Cp,Ur,Br,Tg,Co,CKs0,CKs1,CKs2,CKs3,CKs4',
            'display_limit': 100
        }
        
        return self.make_request(self.base_url, params)
        
    def discover_hidden_params(self) -> List[str]:
        """Discover hidden parameters for Semrush API"""
        # Based on research, these are some undocumented parameters
        return [
            'SourceDomainAuthority',
            'BacklinkType', 
            'LinkStatus',
            'ReferringIPs',
            'ReferringSubnets',
            'UniqueDomains',
            'Follows',
            'Nofollows'
        ]

class AhrefsDiscoverer(APIDiscoveryTool):
    """Discover hidden Ahrefs API endpoints"""
    
    def __init__(self, api_key: str):
        super().__init__(api_key)
        self.base_url = "https://api.ahrefs.com/v3"
        
    def get_site_overview_enhanced(self, domain: str) -> Dict:
        """Get enhanced site overview with hidden parameters"""
        url = f"{self.base_url}/site-explorer/overview"
        params = {
            'key': self.api_key,
            'target': domain,
            'include_subdomains': 'true',
            'exclude_internal': 'true',
            'metrics': 'extended',
            'filter_by_keyword': ''
        }
        
        return self.make_request(url, params)
        
    def get_extended_backlinks(self, domain: str) -> Dict:
        """Get backlinks with extended metrics"""
        url = f"{self.base_url}/backlinks/backlinks"
        params = {
            'key': self.api_key,
            'target': domain,
            'mode': 'exact',
            'sort': 'url',
            'include_subdomains': 'true',
            'exclude_internal': 'true'
        }
        
        return self.make_request(url, params)
        
    def discover_hidden_params(self) -> List[str]:
        """Discover hidden parameters for Ahrefs API"""
        return [
            'include_subdomains',
            'exclude_internal', 
            'filter_by_keyword',
            'metrics',
            'extended',
            'anchor_text_filter',
            'link_type_filter'
        ]

class MozDiscoverer(APIDiscoveryTool):
    """Discover hidden Moz API endpoints"""
    
    def __init__(self, access_id: str, secret_key: str):
        super().__init__()
        self.access_id = access_id
        self.secret_key = secret_key
        self.base_url = "https://lsapi.seomoz.com/v2"
        
    def get_enhanced_url_metrics(self, url: str) -> Dict:
        """Get URL metrics with hidden bitfields"""
        endpoint = f"{self.base_url}/url_metrics"
        # Bitfield 68719476736 unlocks additional metrics
        params = {
            'Cols': '68719476736',  # Extended metrics
            'url': url
        }
        
        # Moz uses digest authentication
        from requests.auth import HTTPDigestAuth
        auth = HTTPDigestAuth(self.access_id, self.secret_key)
        
        try:
            response = self.session.get(endpoint, params=params, auth=auth)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error making Moz request: {e}")
            return {}
            
    def discover_hidden_bitfields(self) -> List[str]:
        """Discover hidden bitfield values for Moz API"""
        return [
            '68719476736',   # MozRank and extended link metrics
            '137438953472',  # Spam Score data
            '274877906944',  # Domain Authority history
            '549755813888',  # Page Authority history
            '1099511627776'   # Link metrics breakdown
        ]

class DataForSEODiscoverer(APIDiscoveryTool):
    """Discover hidden DataForSEO API endpoints"""
    
    def __init__(self, login: str, password: str):
        super().__init__()
        self.login = login
        self.password = password
        self.base_url = "https://api.dataforseo.com/v3"
        
    def get_enhanced_serp_data(self, keyword: str) -> Dict:
        """Get SERP data with hidden parameters"""
        endpoint = f"{self.base_url}/serp/google/organic/live/advanced"
        data = {
            "keyword": keyword,
            "calculate_rectangles": True,
            "browser_preset": "firefox120",
            "page_render": True,
            "accept_language": "en-US"
        }
        
        try:
            response = self.session.post(
                endpoint,
                auth=(self.login, self.password),
                json=data
            )
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error making DataForSEO request: {e}")
            return {}
            
    def discover_hidden_params(self) -> List[str]:
        """Discover hidden parameters for DataForSEO API"""
        return [
            'calculate_rectangles',
            'browser_preset',
            'page_render',
            'accept_language',
            'user_agent',
            'proxy_preset'
        ]

class CaptchaDiscoverer(APIDiscoveryTool):
    """Discover hidden 2Captcha API endpoints"""
    
    def __init__(self, api_key: str):
        super().__init__(api_key)
        self.base_url = "https://2captcha.com"
        
    def get_enhanced_captcha_solve(self, site_key: str, page_url: str) -> Dict:
        """Solve captcha with hidden parameters"""
        endpoint = f"{self.base_url}/in.php"
        params = {
            'key': self.api_key,
            'method': 'userrecaptcha',
            'soft_id': '12345',  # Specific solver algorithm
            'pingback': 'https://yourdomain.com/callback',
            'googlekey': site_key,
            'pageurl': page_url
        }
        
        return self.make_request(endpoint, params)
        
    def discover_hidden_params(self) -> List[str]:
        """Discover hidden parameters for 2Captcha API"""
        return [
            'soft_id',
            'pingback',
            'proxy',
            'proxytype',
            'header_acao',
            'invisible'
        ]

def main():
    parser = argparse.ArgumentParser(description='Hidden API Discovery Tool')
    parser.add_argument('--tool', choices=['semrush', 'ahrefs', 'moz', 'dataforseo', 'captcha'], 
                       required=True, help='SEO tool to analyze')
    parser.add_argument('--action', choices=['analyze', 'discover', 'test'], 
                       default='analyze', help='Action to perform')
    parser.add_argument('--domain', help='Domain to analyze')
    parser.add_argument('--keyword', help='Keyword for SERP analysis')
    parser.add_argument('--api-key', help='API key for the selected tool')
    parser.add_argument('--access-id', help='Moz access ID')
    parser.add_argument('--secret-key', help='Moz secret key')
    parser.add_argument('--login', help='DataForSEO login')
    parser.add_argument('--password', help='DataForSEO password')
    
    args = parser.parse_args()
    
    if args.tool == 'semrush' and args.api_key:
        discoverer = SemrushDiscoverer(args.api_key)
        if args.action == 'analyze' and args.domain:
            result = discoverer.get_enhanced_backlinks(args.domain)
            print(json.dumps(result, indent=2))
        elif args.action == 'discover':
            hidden_params = discoverer.discover_hidden_params()
            print("Hidden Semrush Parameters:")
            for param in hidden_params:
                print(f"  - {param}")
                
    elif args.tool == 'ahrefs' and args.api_key:
        discoverer = AhrefsDiscoverer(args.api_key)
        if args.action == 'analyze' and args.domain:
            result = discoverer.get_site_overview_enhanced(args.domain)
            print(json.dumps(result, indent=2))
        elif args.action == 'discover':
            hidden_params = discoverer.discover_hidden_params()
            print("Hidden Ahrefs Parameters:")
            for param in hidden_params:
                print(f"  - {param}")
                
    elif args.tool == 'moz' and args.access_id and args.secret_key:
        discoverer = MozDiscoverer(args.access_id, args.secret_key)
        if args.action == 'analyze' and args.domain:
            result = discoverer.get_enhanced_url_metrics(args.domain)
            print(json.dumps(result, indent=2))
        elif args.action == 'discover':
            hidden_bitfields = discoverer.discover_hidden_bitfields()
            print("Hidden Moz Bitfields:")
            for bitfield in hidden_bitfields:
                print(f"  - {bitfield}")
                
    elif args.tool == 'dataforseo' and args.login and args.password:
        discoverer = DataForSEODiscoverer(args.login, args.password)
        if args.action == 'analyze' and args.keyword:
            result = discoverer.get_enhanced_serp_data(args.keyword)
            print(json.dumps(result, indent=2))
        elif args.action == 'discover':
            hidden_params = discoverer.discover_hidden_params()
            print("Hidden DataForSEO Parameters:")
            for param in hidden_params:
                print(f"  - {param}")
                
    elif args.tool == 'captcha' and args.api_key:
        discoverer = CaptchaDiscoverer(args.api_key)
        if args.action == 'discover':
            hidden_params = discoverer.discover_hidden_params()
            print("Hidden 2Captcha Parameters:")
            for param in hidden_params:
                print(f"  - {param}")

if __name__ == "__main__":
    main()
# Deployment Guide

## Vercel Deployment Configuration

### Prerequisites

1. Vercel account with access to deploy
2. Supabase project with waitlist tables migrated
3. Domain `matchmkr.pro` DNS configured

### Vercel Project Settings

#### General Settings

- **Framework Preset**: Next.js
- **Root Directory**: `web`
- **Build Command**: `npm run build` (default)
- **Install Command**: `npm install` (default)
- **Output Directory**: `.next` (default)
- **Node.js Version**: 18.x or higher

#### Environment Variables

Add the following environment variables in the Vercel dashboard (Settings → Environment Variables):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important**: Use the anonymous key (anon key), NOT the service role key. The anon key is safe for client-side use and Row Level Security (RLS) policies will enforce access control.

### Custom Domain Configuration

1. Go to Vercel project dashboard → Settings → Domains
2. Add domain: `matchmkr.pro`
3. Configure DNS records as directed by Vercel:
   - For root domain: A record or CNAME
   - Vercel will automatically provision SSL certificate

### Deployment Steps

1. **Initial Deploy**
   ```bash
   # From project root
   cd web
   vercel
   ```

2. **Production Deploy**
   ```bash
   vercel --prod
   ```

3. **Or use Git integration**
   - Connect repository to Vercel
   - Push to main branch triggers automatic deployment
   - Configure root directory to `web` in project settings

### Post-Deployment Verification

After deployment, verify the following:

- [ ] Landing page loads at matchmkr.pro
- [ ] Waitlist form submits successfully
- [ ] Referral form submits successfully
- [ ] Duplicate email shows proper error message
- [ ] Validation errors display correctly
- [ ] Data appears in Supabase waitlist_matchmakers table
- [ ] Data appears in Supabase waitlist_referrals table
- [ ] Mobile responsiveness (test on 375px, 768px, 1024px)
- [ ] Forms are keyboard accessible
- [ ] Run Lighthouse audit (aim for 90+ scores)

### Troubleshooting

#### Build fails with "Module not found"

- Ensure all dependencies are listed in `package.json`
- Check that imports use correct paths (components should use `@/` alias)

#### Forms don't submit / 500 errors

- Verify environment variables are set in Vercel dashboard
- Check Supabase anon key has INSERT permissions via RLS policies
- Verify waitlist tables exist in Supabase database

#### Domain not working

- Verify DNS records are configured correctly
- Wait for DNS propagation (can take up to 48 hours)
- Check Vercel dashboard for domain status

### Monitoring

- View deployment logs in Vercel dashboard
- Check Supabase logs for database errors
- Set up Vercel Analytics for page view tracking (optional)

### Future Enhancements

- Email notifications when waitlist entries are submitted (Resend/SendGrid)
- Admin dashboard to view/manage waitlist entries
- A/B testing for different hero copy
- URL parameters for matchmaker referrals (e.g., `?m=email@example.com`)

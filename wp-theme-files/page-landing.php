<?php
/**
 * Template Name: Epipheo Landing
 *
 * Standalone landing page - intentionally does NOT call get_header() or
 * get_footer(). wp_head() and wp_footer() are called directly so plugins
 * (analytics, caching, security, etc.) still fire.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$asset_base = esc_url( get_stylesheet_directory_uri() );
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
  <meta charset="<?php bloginfo( 'charset' ); ?>">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="icon" type="image/svg+xml" href="<?php echo $asset_base; ?>/assets/images/epipheo-logo-orange.svg">
  <link rel="apple-touch-icon" href="<?php echo $asset_base; ?>/assets/images/epipheo-logo-black.png">
  <script src="https://fast.wistia.com/assets/external/E-v1.js" async></script>
  <link rel="stylesheet" href="https://fast.wistia.com/assets/external/E-v1.css" />
  <?php wp_head(); ?>
</head>
<body <?php body_class( 'epipheo-landing' ); ?>>

<!-- NAV -->
<header class="topnav" id="nav">
  <div class="nav-inner">
    <a class="brand" href="https://epipheo.com/" aria-label="Epipheo home">
      <img src="<?php echo $asset_base; ?>/assets/images/epipheo-logo-black.png" alt="Epipheo" width="180" height="48">
    </a>
    <nav class="nav-links" id="navLinks" aria-label="Primary">
      <?php if ( have_rows( 'nav_links' ) ) : while ( have_rows( 'nav_links' ) ) : the_row(); ?>
        <a href="<?php echo esc_url( get_sub_field( 'url' ) ); ?>" target="_blank" rel="noopener"><?php echo esc_html( get_sub_field( 'label' ) ); ?></a>
      <?php endwhile; endif; ?>
    </nav>
    <div class="nav-actions">
      <a class="btn-primary" href="<?php echo esc_url( get_field( 'nav_cta_url' ) ); ?>" target="_blank" rel="noopener"><?php echo esc_html( get_field( 'nav_cta_text' ) ); ?></a>
    </div>
    <button class="nav-menu" id="navMenu" aria-label="Open menu" aria-expanded="false">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
    </button>
  </div>
</header>

<!-- HERO -->
<section class="hero">
  <div class="container">
    <div class="hero-grid">
      <div>
        <span class="eyebrow"><?php echo esc_html( get_field( 'hero_eyebrow' ) ); ?></span>
        <h1><?php echo wp_kses_post( get_field( 'hero_headline' ) ); ?></h1>
        <p class="lede"><?php echo esc_html( get_field( 'hero_description' ) ); ?></p>
        <div class="trust-row">
          <div class="bit"><b><?php echo esc_html( get_field( 'trust_stat_1_value' ) ); ?></b><?php echo esc_html( get_field( 'trust_stat_1_label' ) ); ?></div>
          <div class="bit"><b><?php echo esc_html( get_field( 'trust_stat_2_value' ) ); ?></b><?php echo esc_html( get_field( 'trust_stat_2_label' ) ); ?></div>
          <div class="bit"><b><?php echo esc_html( get_field( 'trust_stat_3_value' ) ); ?></b><?php echo esc_html( get_field( 'trust_stat_3_label' ) ); ?></div>
        </div>
      </div>

      <!-- CHAT WIDGET -->
      <div class="chat-frame" id="chat" data-mode="text" data-voice="off" data-voice-disabled="true">
        <div class="chat-head">
          <div class="title">
            <span class="status-dot" id="statusDot"></span>
            Scope My Project
          </div>

        </div>



        <!-- Text stage -->
        <div class="msg-stage" id="msgStage">
          <div class="msg agent">
            <span class="who">Agent</span>
            Let's scope your video. In a sentence or two - what's it for, who's it for, and roughly how long does it need to be? I'll ask a few follow-ups, then land on a range inside <span class="accent">+/-15%</span> of a real Epipheo quote.
          </div>
        </div>



        <div class="composer">
          <input id="chatInput" type="text" placeholder="Describe your project... audience, length, what it needs to do" autocomplete="off">
          <button class="send" id="sendBtn">Scope it -></button>
        </div>

        <div class="chat-foot">
          <span><span class="dot"></span>Scoping live · 8 inputs · +/-15% accuracy</span>
          <span>No sales pitch</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- CLIENTS -->
<section class="clients">
  <div class="container">
    <div class="clients-head"><?php echo esc_html( get_field( 'clients_heading' ) ); ?></div>
    <div class="clients-row">
      <?php if ( have_rows( 'client_logos' ) ) : while ( have_rows( 'client_logos' ) ) : the_row(); ?>
        <img src="<?php echo esc_url( get_sub_field( 'logo_url' ) ); ?>" alt="<?php echo esc_attr( get_sub_field( 'logo_alt' ) ); ?>" class="client-logo-img" loading="lazy">
      <?php endwhile; endif; ?>
    </div>
  </div>
</section>

<!-- WHY USE -->
<section class="why-wrap">
  <div class="container">
    <div class="why-card">
      <h2><?php echo esc_html( get_field( 'why_heading' ) ); ?></h2>
      <div class="why-grid">
        <?php if ( have_rows( 'why_columns' ) ) : while ( have_rows( 'why_columns' ) ) : the_row(); ?>
          <div class="why-col">
            <h4><?php echo wp_kses_post( get_sub_field( 'title' ) ); ?></h4>
            <p><?php echo esc_html( get_sub_field( 'description' ) ); ?></p>
          </div>
        <?php endwhile; endif; ?>
      </div>
      <div class="why-footer">
        <h3><?php echo esc_html( get_field( 'why_footer_heading' ) ); ?></h3>
        <p><?php echo esc_html( get_field( 'why_footer_description' ) ); ?></p>
      </div>
    </div>
  </div>
</section>

<!-- PRICE TIERS -->
<section>
  <div class="container">
    <div class="s-head">
      <div>
        <span class="eyebrow"><?php echo esc_html( get_field( 'tiers_eyebrow' ) ); ?></span>
        <h2><?php echo wp_kses_post( get_field( 'tiers_heading' ) ); ?></h2>
      </div>
      <p class="lede"><?php echo esc_html( get_field( 'tiers_description' ) ); ?></p>
    </div>
    <div class="tier-grid">
      <?php if ( have_rows( 'tiers' ) ) : while ( have_rows( 'tiers' ) ) : the_row();
        $is_featured = get_sub_field( 'is_featured' );
        $flag_text   = get_sub_field( 'flag_text' );
      ?>
        <article class="tier<?php echo $is_featured ? ' featured' : ''; ?>">
          <?php if ( $is_featured && $flag_text ) : ?>
            <span class="flag"><?php echo esc_html( $flag_text ); ?></span>
          <?php endif; ?>
          <div class="tag"><?php echo esc_html( get_sub_field( 'tag' ) ); ?></div>
          <div class="name"><?php echo wp_kses_post( get_sub_field( 'name' ) ); ?></div>
          <div class="price"><?php echo esc_html( get_sub_field( 'price_main' ) ); ?><small><?php echo esc_html( get_sub_field( 'price_suffix' ) ); ?></small></div>
          <ul>
            <?php
            $features = get_sub_field( 'features' );
            if ( $features ) :
              $lines = array_filter( array_map( 'trim', explode( "\n", $features ) ) );
              foreach ( $lines as $line ) : ?>
                <li><?php echo esc_html( $line ); ?></li>
              <?php endforeach;
            endif; ?>
          </ul>
          <div class="foot">
            <?php
            $footer_text = get_sub_field( 'footer_text' );
            if ( $footer_text ) :
              $ft_lines = array_filter( array_map( 'trim', explode( "\n", $footer_text ) ) );
              foreach ( $ft_lines as $ft_line ) : ?>
                <span><?php echo esc_html( $ft_line ); ?></span>
              <?php endforeach;
            endif; ?>
          </div>
        </article>
      <?php endwhile; endif; ?>
    </div>
  </div>
</section>

<!-- DRIVERS -->
<section class="drivers">
  <div class="container">
    <div class="s-head">
      <div>
        <span class="eyebrow"><?php echo esc_html( get_field( 'drivers_eyebrow' ) ); ?></span>
        <h2><?php echo wp_kses_post( get_field( 'drivers_heading' ) ); ?></h2>
      </div>
      <p class="lede"><?php echo esc_html( get_field( 'drivers_description' ) ); ?></p>
    </div>
    <div class="drivers-grid">
      <?php if ( have_rows( 'drivers' ) ) : while ( have_rows( 'drivers' ) ) : the_row();
        $is_accent = get_sub_field( 'is_accent' );
        $impact    = intval( get_sub_field( 'impact_percent' ) );
      ?>
        <div class="driver">
          <div class="num"><b><?php echo esc_html( get_sub_field( 'number' ) ); ?></b><?php echo esc_html( get_sub_field( 'label' ) ); ?></div>
          <h4><?php echo esc_html( get_sub_field( 'title' ) ); ?></h4>
          <p><?php echo esc_html( get_sub_field( 'description' ) ); ?></p>
          <div class="range">Impact<div class="bar"><i<?php echo $is_accent ? ' class="accent"' : ''; ?> style="width:<?php echo esc_attr( $impact ); ?>%"></i></div></div>
        </div>
      <?php endwhile; endif; ?>
    </div>
  </div>
</section>

<!-- PRICE BY STYLE -->
<section>
  <div class="container">
    <div class="s-head">
      <div>
        <span class="eyebrow"><?php echo esc_html( get_field( 'styles_eyebrow' ) ); ?></span>
        <h2><?php echo wp_kses_post( get_field( 'styles_heading' ) ); ?></h2>
      </div>
      <p class="lede"><?php echo esc_html( get_field( 'styles_description' ) ); ?></p>
    </div>
    <table class="px-table">
      <thead>
        <tr>
          <th>Style</th>
          <th>Typical Range</th>
          <th>Timeline</th>
          <th>Best for</th>
        </tr>
      </thead>
      <tbody>
        <?php if ( have_rows( 'style_rows' ) ) : while ( have_rows( 'style_rows' ) ) : the_row();
          $is_hot = get_sub_field( 'is_hot' );
        ?>
          <tr>
            <td class="style"><?php echo esc_html( get_sub_field( 'style_name' ) ); ?> <small><?php echo esc_html( get_sub_field( 'style_description' ) ); ?></small></td>
            <td><span class="range"><?php echo esc_html( get_sub_field( 'price_range' ) ); ?></span></td>
            <td class="time"><?php echo esc_html( get_sub_field( 'timeline' ) ); ?></td>
            <td><?php if ( $is_hot ) : ?><span class="hot"><?php echo esc_html( get_sub_field( 'best_for' ) ); ?></span><?php else : echo esc_html( get_sub_field( 'best_for' ) ); endif; ?></td>
          </tr>
        <?php endwhile; endif; ?>
      </tbody>
    </table>
  </div>
</section>

<!-- USE CASES -->
<section>
  <div class="container">
    <div class="s-head">
      <div>
        <span class="eyebrow"><?php echo esc_html( get_field( 'usecases_eyebrow' ) ); ?></span>
        <h2><?php echo wp_kses_post( get_field( 'usecases_heading' ) ); ?></h2>
      </div>
      <p class="lede"><?php echo esc_html( get_field( 'usecases_description' ) ); ?></p>
    </div>
    <div class="uc-grid">
      <?php if ( have_rows( 'use_cases' ) ) : while ( have_rows( 'use_cases' ) ) : the_row(); ?>
        <div class="uc">
          <div><h4><?php echo esc_html( get_sub_field( 'title' ) ); ?></h4><p><?php echo esc_html( get_sub_field( 'description' ) ); ?></p></div>
          <div class="px"><?php echo esc_html( get_sub_field( 'price' ) ); ?><small><?php echo esc_html( get_sub_field( 'duration' ) ); ?></small></div>
        </div>
      <?php endwhile; endif; ?>
    </div>
  </div>
</section>

<!-- PROCESS TIMELINE -->
<section>
  <div class="container">
    <div class="s-head">
      <div>
        <span class="eyebrow"><?php echo esc_html( get_field( 'process_eyebrow' ) ); ?></span>
        <h2><?php echo wp_kses_post( get_field( 'process_heading' ) ); ?></h2>
      </div>
      <p class="lede"><?php echo esc_html( get_field( 'process_description' ) ); ?></p>
    </div>
    <div class="timeline">
      <?php if ( have_rows( 'process_steps' ) ) : while ( have_rows( 'process_steps' ) ) : the_row();
        $is_active = get_sub_field( 'is_active' );
      ?>
        <div class="t-step<?php echo $is_active ? ' active' : ''; ?>">
          <div class="wk"><?php echo esc_html( get_sub_field( 'week_label' ) ); ?></div>
          <h4><?php echo esc_html( get_sub_field( 'title' ) ); ?></h4>
          <p><?php echo esc_html( get_sub_field( 'description' ) ); ?></p>
        </div>
      <?php endwhile; endif; ?>
    </div>
  </div>
</section>

<!-- COMPARISON -->
<section class="cmp">
  <div class="container">
    <div class="s-head">
      <div>
        <span class="eyebrow"><?php echo esc_html( get_field( 'comparison_eyebrow' ) ); ?></span>
        <h2><?php echo wp_kses_post( get_field( 'comparison_heading' ) ); ?></h2>
      </div>
      <p class="lede" style="color:rgba(255,255,255,.7)"><?php echo esc_html( get_field( 'comparison_description' ) ); ?></p>
    </div>
    <table class="cmp-table">
      <thead>
        <tr>
          <th></th>
          <th>DIY / AI Tool</th>
          <th>Freelancer</th>
          <th class="highlight">Agency (Epipheo)</th>
        </tr>
      </thead>
      <tbody>
        <?php if ( have_rows( 'comparison_rows' ) ) : while ( have_rows( 'comparison_rows' ) ) : the_row(); ?>
          <tr>
            <th><?php echo esc_html( get_sub_field( 'label' ) ); ?></th>
            <td><?php echo wp_kses_post( get_sub_field( 'diy_value' ) ); ?></td>
            <td><?php echo wp_kses_post( get_sub_field( 'freelancer_value' ) ); ?></td>
            <td class="highlight"><?php echo wp_kses_post( get_sub_field( 'agency_value' ) ); ?></td>
          </tr>
        <?php endwhile; endif; ?>
      </tbody>
    </table>
  </div>
</section>

<!-- PORTFOLIO -->
<section>
  <div class="container">
    <div class="s-head">
      <div>
        <span class="eyebrow"><?php echo esc_html( get_field( 'portfolio_eyebrow' ) ); ?></span>
        <h2><?php echo wp_kses_post( get_field( 'portfolio_heading' ) ); ?></h2>
      </div>
      <p class="lede"><?php echo esc_html( get_field( 'portfolio_description' ) ); ?></p>
    </div>
    <div class="portfolio-grid">
      <?php if ( have_rows( 'portfolio_cards' ) ) : while ( have_rows( 'portfolio_cards' ) ) : the_row();
        $wistia_id = get_sub_field( 'wistia_id' );
      ?>
        <div class="p-card<?php echo $wistia_id ? ' has-video' : ''; ?>"<?php echo $wistia_id ? ' data-wistia-id="' . esc_attr( $wistia_id ) . '"' : ''; ?>>
          <div class="p-thumb">
            <div class="corner"></div>
            <img src="<?php echo esc_url( get_sub_field( 'image_url' ) ); ?>" alt="<?php echo esc_attr( get_sub_field( 'image_alt' ) ); ?>" loading="lazy">
            <?php if ( $wistia_id ) : ?>
            <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:2;background:rgba(0,0,0,.2);opacity:0;transition:opacity .25s ease;cursor:pointer;" class="play-btn" data-video-id="<?php echo esc_attr( $wistia_id ); ?>"><svg width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="28" fill="rgba(0,0,0,.55)"/><polygon points="22,16 22,40 42,28" fill="#fff"/></svg></div>
            <?php endif; ?>
          </div>
          <div class="tag"><?php echo esc_html( get_sub_field( 'tag' ) ); ?></div>
          <div class="title"><?php echo esc_html( get_sub_field( 'title' ) ); ?></div>
          <div class="px"><?php echo esc_html( get_sub_field( 'price_band' ) ); ?></div>
        </div>
      <?php endwhile; endif; ?>
    </div>
  </div>
</section>

<!-- MID CTA -->
<section class="mid-cta">
  <div class="container">
    <h2><?php echo esc_html( get_field( 'mid_cta_heading' ) ); ?></h2>
    <p><?php echo esc_html( get_field( 'mid_cta_description' ) ); ?></p>
    <button class="btn-connect" data-scroll-chat><?php echo esc_html( get_field( 'mid_cta_button_text' ) ); ?></button>
  </div>
</section>

<!-- FAQ -->
<section>
  <div class="container">
    <div class="s-head">
      <div>
        <span class="eyebrow"><?php echo esc_html( get_field( 'faq_eyebrow' ) ); ?></span>
        <h2><?php echo wp_kses_post( get_field( 'faq_heading' ) ); ?></h2>
      </div>
      <p class="lede"><?php echo esc_html( get_field( 'faq_description' ) ); ?></p>
    </div>
    <div class="faq-grid">
      <?php if ( have_rows( 'faqs' ) ) : while ( have_rows( 'faqs' ) ) : the_row(); ?>
        <details class="faq">
          <summary><?php echo esc_html( get_sub_field( 'question' ) ); ?></summary>
          <p><?php echo esc_html( get_sub_field( 'answer' ) ); ?></p>
        </details>
      <?php endwhile; endif; ?>
    </div>
  </div>
</section>

<!-- RELATED -->
<section>
  <div class="container">
    <div class="s-head">
      <div>
        <span class="eyebrow"><?php echo esc_html( get_field( 'related_eyebrow' ) ); ?></span>
        <h2><?php echo wp_kses_post( get_field( 'related_heading' ) ); ?></h2>
      </div>
    </div>
    <div class="related-grid">
      <?php if ( have_rows( 'related_articles' ) ) : while ( have_rows( 'related_articles' ) ) : the_row(); ?>
        <a class="rel" href="<?php echo esc_url( get_sub_field( 'url' ) ); ?>" target="_blank" rel="noopener">
          <span class="cat"><?php echo esc_html( get_sub_field( 'category_label' ) ); ?></span>
          <h4><?php echo esc_html( get_sub_field( 'title' ) ); ?></h4>
          <p><?php echo esc_html( get_sub_field( 'description' ) ); ?></p>
        </a>
      <?php endwhile; endif; ?>
    </div>
  </div>
</section>

<!-- FINAL CTA -->
<section class="cta-section">
  <div class="container">
    <div class="cta-frame">
      <div class="top"><?php echo esc_html( get_field( 'final_cta_top_text' ) ); ?></div>
      <h2><?php echo wp_kses_post( get_field( 'final_cta_heading' ) ); ?></h2>
      <div class="cta-bottom">
        <p><?php echo esc_html( get_field( 'final_cta_description' ) ); ?></p>
        <button class="btn-primary" data-scroll-chat><?php echo esc_html( get_field( 'final_cta_button_text' ) ); ?></button>
      </div>
    </div>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-grid">
    <div>
      <span class="footer-brand"><img src="<?php echo $asset_base; ?>/assets/images/epipheo-logo-white.png" alt="Epipheo" width="200" height="56"></span>
      <p class="footer-tag"><?php echo esc_html( get_field( 'footer_tagline' ) ); ?></p>
      <button class="btn-secondary" style="border-color:rgba(255,255,255,.3);color:#fff;" data-scroll-chat><?php echo esc_html( get_field( 'footer_cta_text' ) ); ?></button>
    </div>
    <div>
      <h5>Services</h5>
      <ul>
        <?php if ( have_rows( 'footer_services' ) ) : while ( have_rows( 'footer_services' ) ) : the_row(); ?>
          <li><a href="<?php echo esc_url( get_sub_field( 'url' ) ); ?>" target="_blank" rel="noopener"><?php echo esc_html( get_sub_field( 'label' ) ); ?></a></li>
        <?php endwhile; endif; ?>
      </ul>
    </div>
    <div>
      <h5>Resources</h5>
      <ul>
        <?php if ( have_rows( 'footer_resources' ) ) : while ( have_rows( 'footer_resources' ) ) : the_row(); ?>
          <li><a href="<?php echo esc_url( get_sub_field( 'url' ) ); ?>" target="_blank" rel="noopener"><?php echo esc_html( get_sub_field( 'label' ) ); ?></a></li>
        <?php endwhile; endif; ?>
      </ul>
    </div>
    <div>
      <h5>Company</h5>
      <ul>
        <?php if ( have_rows( 'footer_company' ) ) : while ( have_rows( 'footer_company' ) ) : the_row(); ?>
          <li><a href="<?php echo esc_url( get_sub_field( 'url' ) ); ?>" target="_blank" rel="noopener"><?php echo esc_html( get_sub_field( 'label' ) ); ?></a></li>
        <?php endwhile; endif; ?>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>&copy; <span id="year"></span> <?php echo esc_html( get_field( 'footer_copyright_text' ) ); ?></span>
    <span><?php echo esc_html( get_field( 'footer_address' ) ); ?></span>
  </div>
</footer>

<!-- Custom video lightbox -->
<div id="video-lightbox" style="display:none;position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.85);align-items:center;justify-content:center;">
  <div style="position:relative;width:90vw;max-width:960px;aspect-ratio:16/9;">
    <div id="video-lightbox-player" style="width:100%;height:100%;"></div>
    <button id="video-lightbox-close" style="position:absolute;top:-40px;right:0;background:none;border:none;color:#fff;font-size:32px;cursor:pointer;line-height:1;padding:4px 8px;">&times;</button>
  </div>
</div>

<style>
.p-card.has-video{cursor:pointer}
.p-card.has-video:hover .play-btn{opacity:1!important}
#video-lightbox[style*="flex"]{display:flex!important}
</style>
<script>
(function() {
  var lightbox = document.getElementById('video-lightbox');
  var playerContainer = document.getElementById('video-lightbox-player');
  var closeBtn = document.getElementById('video-lightbox-close');
  var currentVideo = null;

  function openVideo(videoId) {
    playerContainer.innerHTML = '';
    var embed = document.createElement('div');
    embed.className = 'wistia_embed wistia_async_' + videoId + ' videoFoam=true playerColor=FF5F3C autoPlay=true';
    embed.style.cssText = 'width:100%;height:100%;';
    playerContainer.appendChild(embed);
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    window._wq = window._wq || [];
    window._wq.push({ id: videoId, onReady: function(video) {
      currentVideo = video;
      video.play();
    }});
  }

  function closeVideo() {
    if (lightbox.style.display !== 'flex') return;
    if (currentVideo) {
      currentVideo.pause();
      currentVideo.remove();
      currentVideo = null;
    }
    playerContainer.innerHTML = '';
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeVideo);
  lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) closeVideo();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') closeVideo();
  });

  document.querySelectorAll('.play-btn[data-video-id]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      openVideo(btn.getAttribute('data-video-id'));
    });
  });
})();
</script>
<?php wp_footer(); ?>
</body>
</html>

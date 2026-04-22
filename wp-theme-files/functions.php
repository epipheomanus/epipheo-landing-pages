<?php
/**
 * Theme functions and definitions.
 */
function minimo_child_enqueue_styles() {
	//Remove unnesesary parent styles and fonts
	wp_dequeue_style( 'minimo-main-style' );
	wp_dequeue_style( 'minimo-fonts' );
 	wp_enqueue_style( 'minimo-style' , get_template_directory_uri() . '/style.css' );
 	wp_enqueue_style( 'minimo-child-style', get_stylesheet_directory_uri() . '/style.css', array( 'minimo-style' ), wp_get_theme()->get('Version') );
	wp_enqueue_script( 'minimo-child-script', get_stylesheet_directory_uri() . '/js/script.js', array( 'jquery' ), wp_get_theme()->get( 'Version' ), true );
}

add_action( 'wp_enqueue_scripts', 'minimo_child_enqueue_styles', 11 );

// Remove Action Scheduler Past-due actions warning
add_filter( 'action_scheduler_pastdue_actions_check_pre', '__return_false' );

/**
 * Return ACF number field as number
 */
add_filter( 'acf/format_value/type=number', 'acf_number_str_to_number', 20, 3 );
function acf_number_str_to_number( $value, $post_id, $field ) {
	if ( empty( $value ) ) {
		return $value;
	}
	$int   = (int) $value;
	$float = (float) $value;
	if ( $int == $float ) {
		return $int;
	} else {
		return $float;
	}
}

/**
 * Add the weight field as a sortable column to the rella-portfolio CPT admin
 */
add_action( 'pre_get_posts', 'filter_main_admin_query' );
add_filter( 'manage_rella-portfolio_posts_columns', 'add_acf_columns' );
add_action( 'manage_rella-portfolio_posts_custom_column', 'rella_portfolio_custom_column', 10, 2 );
add_filter( 'manage_edit-rella-portfolio_sortable_columns', 'weight_register_sortable' );


function filter_main_admin_query($query) {
	if ( is_admin() && $query->is_main_query() ) {
		$scr = get_current_screen();
		if ( $scr->base !== 'edit' && $scr->post_type !== 'rella-portfolio' ) return;


//			if (isset($_GET['weight']) && $_GET['weight'] != 'all') {
//				$query->set('meta_query', array( array(
//					'key' => 'weight',
//					'value' => intval(sanitize_text_field($_GET['weight']))
//				) ) );
//			}

//			for weight_register_sortable
		$orderby = $query->get( 'orderby' );

		if ( 'weight' == $orderby ) {

			$meta_query = array(
				'relation' => 'OR',
				array(
					'key' => 'weight',
					'compare' => 'NOT EXISTS',
				),
				array(
					'key' => 'weight',
				),
			);

			$query->set( 'meta_query', $meta_query );
			$query->set( 'orderby', 'meta_value_num' );
		}
	}
}

function add_acf_columns ( $columns ) {
	return array_merge ( $columns, array (
		'weight' => __ ( 'Weight' )
	) );
}

function rella_portfolio_custom_column ( $column, $post_id ) {
	if ( $column == 'weight' ) {
		echo get_post_meta( $post_id, 'weight', true );
	}
}

function weight_register_sortable( $columns ) {
	$columns['weight'] = 'weight';
	return $columns;
}

//
// Check manually entered links in Portfolio and in Elementor pages (to remove after fixing)
//

function rella_check_portfolio_links() {
    // Query for all rella-portfolio posts
    $args = array(
        'post_type' => 'rella-portfolio',
        'posts_per_page' => -1,
    );

    $query = new WP_Query($args);

    // Check if any posts are found
    if (!$query->have_posts()) {
        echo '<p>No rella-portfolio posts found.</p>';
        return;
    }

    echo '<p>Found ' . $query->found_posts . ' rella-portfolio posts.</p>';
    echo '<table class="widefat fixed" cellspacing="0">';
    echo '<thead><tr><th>#</th><th>Post ID</th><th>Title</th><th>Link</th></tr></thead>';
    echo '<tbody>';

    $index = 1; // Initialize index number

    while ($query->have_posts()) {
        $query->the_post();
        $post_id = get_the_ID();
        $title = get_the_title();
        $cta_field = get_field('cta', $post_id);  // Using 'cta' as the ACF field name

        // Check if 'cta' field is an array and contains a 'url'
        if (is_array($cta_field) && isset($cta_field['url']) && !empty($cta_field['url'])) {
            $link = $cta_field['url'];

            // Check if the link does NOT correspond to an existing post/page
            if (!url_to_postid($link)) {
                // The link is manually entered
                $edit_link = get_edit_post_link($post_id); // Get URL to edit the post
                echo '<tr>';
                echo '<td>' . $index++ . '</td>'; // Display index number
                echo '<td><a href="' . esc_url($edit_link) . '" target="_blank">' . $post_id . '</a></td>'; // Link to edit the post
                echo '<td>' . esc_html($title) . '</td>';
                echo '<td>' . esc_url($link) . '</td>';
                echo '</tr>';
            }
        }
    }

    if ($index==1) echo '<tr><td colspan="4">No manually entered links found. All links are dynamic.</td></tr>';

    echo '</tbody>';
    echo '</table>';

    wp_reset_postdata();
}

function rella_check_portfolio_links_menu() {
    // Add submenu page under "Portfolio Items" (rella-portfolio post type)
    add_submenu_page(
        'edit.php?post_type=rella-portfolio', // Parent slug, the "Check Manual Links', // Page title
        'Check Manual Links', // Menu title
        'manage_options', // Capability
        'check-portfolio-links', // Menu slug
        'rella_check_portfolio_links' // Function to display the content
    );
}
add_action('admin_menu', 'rella_check_portfolio_links_menu');

// Function to recursively find manually entered links in Elementor elements
function find_manual_links_in_elementor_elements($elements, &$manual_links) {
    foreach ($elements as $element) {
        // Check for 'link' settings with 'url' and ensure it's not dynamic or an anchor link
        if (
            isset($element['settings']['link']['url']) &&
            is_string($element['settings']['link']['url']) &&
            !empty($element['settings']['link']['url']) &&
            !isset($element['settings']['__dynamic__']['link']) && // Skip dynamically linked content
            strpos($element['settings']['link']['url'], '#') !== 0 // Skip anchor links
        ) {
            $link = $element['settings']['link']['url'];
            if (!empty($link)) {
                $manual_links[] = esc_url($link); // Add the link to the array
            }
        }

        // Recursively search in nested elements
        if (isset($element['elements']) && is_array($element['elements'])) {
            find_manual_links_in_elementor_elements($element['elements'], $manual_links);
        }

        // Handle nested widgets if present
        if (isset($element['widgets']) && is_array($element['widgets'])) {
            find_manual_links_in_elementor_elements($element['widgets'], $manual_links);
        }
    }
}

// Function to check Elementor content for manually entered links across all pages
function check_elementor_links_across_all_pages() {
    // Query all pages
    $args = array(
        'post_type'   => 'page',
        'post_status' => 'publish',
        'numberposts' => -1,
    );
    $pages = get_posts($args);

    // Start output buffer to capture table HTML
    ob_start();

    echo '<table class="widefat fixed" cellspacing="0">';
    echo '<thead><tr><th>#</th><th>Post ID</th><th>Title</th><th>Manual Links</th><th>Links</th></tr></thead>';
    echo '<tbody>';

    if (!empty($pages)) {
        $index = 1;
        foreach ($pages as $page) {
            $post_id = $page->ID;
            $title = get_the_title($post_id);
            $page_url = get_permalink($post_id);

            // Get Elementor content
            $content = get_post_meta($post_id, '_elementor_data', true);

            if ($content && is_string($content)) {
                // Decode Elementor JSON content
                $elements = json_decode($content, true);

                // Check if decoding was successful
                if (json_last_error() === JSON_ERROR_NONE) {
                    // Initialize an empty array to collect all manual links
                    $manual_links = [];

                    // Recursively find and extract manually entered links
                    find_manual_links_in_elementor_elements($elements, $manual_links);

                    // Count the number of links
                    $link_count = count($manual_links);

                    // Display the table row
                    if ($link_count > 0) { // Only display pages with links
                        $edit_url = get_edit_post_link($post_id) . '&action=elementor'; // URL to edit with Elementor
                        echo '<tr>';
                        echo '<td>' . $index . '</td>'; // Index number
                        echo '<td><a href="' . esc_url($edit_url) . '" target="_blank">' . esc_html($post_id) . '</a></td>'; // Link to edit with Elementor
                        echo '<td><a href="' . esc_url($page_url) . '" target="_blank">' . esc_html($title) . '</a></td>'; // Wrap post title in a link
                        echo '<td>' . $link_count . '</td>'; // Display manual links count
                        echo '<td>' . esc_html(implode(', ', $manual_links)) . '</td>'; // Display actual links
                        echo '</tr>';
                        $index++;
                    }
                }
            }
        }
        if ($index==1) echo '<tr><td colspan="5">No manually entered links found. All links are dynamic.</td></tr>';
    } else {
        echo '<tr><td colspan="5">No pages found.</td></tr>';
    }

    echo '</tbody>';
    echo '</table>';

    // Output buffer content
    $output = ob_get_clean();
    echo $output;
}

// Function to add the custom admin page
function add_check_elementor_links_menu() {
    add_submenu_page(
        'edit.php?post_type=page', // Parent slug
        'Check Manual Links', // Page title
        'Check Manual Links', // Menu title
        'manage_options', // Capability
        'check-elementor-links', // Menu slug
        'check_elementor_links_across_all_pages' // Function to display the content
    );
}
add_action('admin_menu', 'add_check_elementor_links_menu');

//
// END - Check manually entered links in Portfolio (to remove after fixing) - END
//

// ============================================================
// Epipheo Landing Page — enqueue assets & strip conflicting CSS/JS
// Only runs on pages using the "Epipheo Landing" template.
// ============================================================

/**
 * Enqueue landing page CSS and JS.
 */
add_action( 'wp_enqueue_scripts', function () {
	if ( ! is_page_template( 'page-landing.php' ) ) {
		return;
	}
	wp_enqueue_style(
		'epipheo-landing-fonts',
		'https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Oswald:wght@400;500;600;700&display=swap',
		array(),
		null
	);
	wp_enqueue_style(
		'epipheo-landing',
		get_stylesheet_directory_uri() . '/assets/css/landing.css',
		array( 'epipheo-landing-fonts' ),
		filemtime( get_stylesheet_directory() . '/assets/css/landing.css' )
	);
	wp_enqueue_script(
		'epipheo-landing',
		get_stylesheet_directory_uri() . '/assets/js/landing.js',
		array(),
		filemtime( get_stylesheet_directory() . '/assets/js/landing.js' ),
		true
	);
}, 20 );

/**
 * Google Fonts preconnect hints for the landing page.
 */
add_filter( 'wp_resource_hints', function ( $urls, $relation_type ) {
	if ( ! is_page_template( 'page-landing.php' ) ) {
		return $urls;
	}
	if ( 'preconnect' === $relation_type ) {
		$urls[] = array( 'href' => 'https://fonts.googleapis.com' );
		$urls[] = array( 'href' => 'https://fonts.gstatic.com', 'crossorigin' );
	}
	return $urls;
}, 10, 2 );

/**
 * Load landing script with defer (ElevenLabs client loaded dynamically inside the script).
 * NOTE: Do NOT use type="module" here — WP Rocket's lazy-load rewrites it to
 * type="text/rocketlazyloadscript" which silently breaks ES module imports.
 */
add_filter( 'script_loader_tag', function ( $tag, $handle, $src ) {
	if ( 'epipheo-landing' !== $handle ) {
		return $tag;
	}
	return sprintf(
		'<script defer src="%s" id="%s-js"></script>' . "\n",
		esc_url( $src ),
		esc_attr( $handle )
	);
}, 10, 3 );

/**
 * Strip ALL non-essential styles and scripts on the landing page.
 * Runs at priority 9999 so it fires after everything else has been enqueued.
 */
add_action( 'wp_enqueue_scripts', function () {
	if ( ! is_page_template( 'page-landing.php' ) ) {
		return;
	}

	// Styles we want to KEEP
	$keep_styles = array(
		'epipheo-landing',
		'epipheo-landing-fonts',
	);

	// Scripts we want to KEEP
	$keep_scripts = array(
		'epipheo-landing',
		'jquery-core',
		'jquery',
	);

	// Remove all other styles
	global $wp_styles;
	if ( isset( $wp_styles->registered ) ) {
		foreach ( $wp_styles->registered as $handle => $style ) {
			if ( ! in_array( $handle, $keep_styles, true ) ) {
				wp_dequeue_style( $handle );
				wp_deregister_style( $handle );
			}
		}
	}

	// Remove all other scripts
	global $wp_scripts;
	if ( isset( $wp_scripts->registered ) ) {
		foreach ( $wp_scripts->registered as $handle => $script ) {
			if ( ! in_array( $handle, $keep_scripts, true ) ) {
				wp_dequeue_script( $handle );
				wp_deregister_script( $handle );
			}
		}
	}
}, 9999 );
